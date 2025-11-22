<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    // Disable timestamps since they may not exist in all schemas
    public $timestamps = false;

    protected $fillable = [
        'name'
    ];


    public function rate()
    {
        return $this->hasOne('App\Models\CurrencyExchange', 'to_currency_id');
    }

}
