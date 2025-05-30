<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $fillable = [
        'name',
        'address',
        'uraddress',
        'phone',
        'user_id',
        'filial_id',
        'clinic_id',
    ];

    public function users(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function filial(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(ClinicFilial::class);
    }
}
