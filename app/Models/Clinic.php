<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class Clinic extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'uraddress',
        'inn',
        'edrpou',
        'phone',
        'user_id',
        'currency_id'
    ];

    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function currency(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
//        return $this->hasOne(Currency::class);
        return $this->hasOne(Currency::class,'id','currency_id');
    }

    public function employees(): Collection
    {
        $clinicId = $this->id;
        $usersTable = "clinic_{$clinicId}.clinic_users";

        $exists = DB::select("SELECT to_regclass(?) as tbl", [$usersTable])[0]->tbl ?? null;
        if (!$exists) return collect();

        $employees = DB::table("$usersTable as cu")
            ->join('core.users as u', 'cu.user_id', '=', 'u.id')
            ->leftJoin('roles as r', 'cu.role_id', '=', 'r.id')
            ->where('cu.clinic_id', $clinicId)
            ->select(
                'u.id',
                'u.name',
                'u.email',
                'r.name as role_name',
                'cu.role_id',
                'cu.created_at as assigned_at'
            )
            ->orderBy('u.name')
            ->get();

        return $employees;
    }

    /**
     * Возвращает сотрудников с явно структурированными филиалами (удобно для фронта)
     */
    public function employeesWithFilials(): Collection
    {
        $employees = $this->employees();

        // Если employees уже содержит assignments (т.е. был извлёк из clinic_{id}.clinic_filial_user),
        // то просто возвращаем. Иначе — пустой массив assignments.
        return $employees->map(function($u) {
            if (isset($u->assignments)) {
                return $u;
            }

            return (object)[
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'assignments' => []
            ];
        });
    }
}
