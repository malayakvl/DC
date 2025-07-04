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
        return $this->belongsToMany(User::class);
    }

    public function currency(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
//        return $this->hasOne(Currency::class);
        return $this->hasOne(Currency::class,'id','currency_id');
    }
}
