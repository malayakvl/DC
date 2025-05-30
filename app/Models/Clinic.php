<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
//        return $this->belongsToMany(User::class, 'user_has_bookmark', 'user_id', 'entity_id')
//            ->as('bookmark')
//            ->get()
//            ->groupBy('entity_type_id');
        return $this->belongsToMany(User::class);
    }

    public function currency(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Currency::class);
    }
}
