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
        // $usersTable = "clinic_{$clinicId}.clinic_users";

        // $exists = DB::select("SELECT to_regclass(?) as tbl", [$usersTable])[0]->tbl ?? null;
        // if (!$exists) return collect();

        $customerData = DB::table('core.clinic_user')
                ->join('core.users', 'clinic_user.user_id', '=', 'users.id')
                ->select(
                    'users.id',
                    'users.first_name',
                    'users.last_name',
                    DB::raw("CONCAT(users.first_name, ' ', users.last_name) as name"),
                    'users.email'
                )
                ->where('clinic_user.clinic_id', $clinicId)
                ->orderBy('users.last_name')
                ->get();

        return $customerData;
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
