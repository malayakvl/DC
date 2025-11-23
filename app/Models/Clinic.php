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

        // 1) Попробуем взять связи из схемы клиники (clinic_{id}.clinic_filial_user)
        //    — это основной источник прав/назначений у вас
        $filialTable = "clinic_{$clinicId}.clinic_filial_user";

        // Проверим, существует ли таблица в схеме клиники (на всякий случай)
        $tbl = DB::select("SELECT to_regclass(?) as tbl", [$filialTable])[0]->tbl ?? null;

        if ($tbl) {
            // Если таблица есть — берем пользователей через неё (и отдаём также роль/filial info)
            $employees = DB::table("{$filialTable} as cf")
                ->join('core.users as u', 'cf.user_id', '=', 'u.id')
                ->where('cf.clinic_id', $clinicId) // если вы храните clinic_id внутри таблицы
                ->select(
                    'u.id',
                    'u.name',
                    'u.email',
                    'cf.filial_id',
                    'cf.role_id',
                    'cf.created_at as assigned_at'
                )
                ->get()
                ->groupBy('id') // сгруппируем по пользователю, чтобы потом легко собрать филиалы
                ->map(function ($items, $userId) {
                    // items — коллекция назначений одного пользователя (может быть несколько филиалов)
                    $first = $items->first();
                    return (object)[
                        'id' => $first->id,
                        'name' => $first->name,
                        'email' => $first->email,
                        'assignments' => $items->map(function($it){
                            return [
                                'filial_id' => $it->filial_id,
                                'role_id' => $it->role_id,
                                'assigned_at' => $it->assigned_at,
                            ];
                        })->values()
                    ];
                })->values();

            return $employees;
        }

        // 2) Fallback: если по какой-то причине таблицы clinic_filial_user нет — 
        //    попробуем core.clinic_users (если вы решите её добавить)
        $existsCore = DB::select("SELECT to_regclass('core.clinic_users') as tbl")[0]->tbl ?? null;

        if ($existsCore) {
            $employees = DB::table('core.users as u')
                ->join('core.clinic_users as cu', 'cu.user_id', '=', 'u.id')
                ->where('cu.clinic_id', $clinicId)
                ->select('u.id', 'u.name', 'u.email')
                ->get();

            return $employees;
        }

        // 3) Нигде не найдено — вернём пустую коллекцию
        return collect();
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
