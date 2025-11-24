<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['name'];
    protected $appends = ['rate_value'];

    protected static function booted()
    {
        static::addGlobalScope('schema', function ($builder) {
            $clinicId = session()->get('clinic_id');
            if ($clinicId) {
                $builder->from("clinic_{$clinicId}.currencies as currencies");
            }
        });
    }

    public function rate()
    {
        $clinicId = session()->get('clinic_id');

        return $this->hasOne(CurrencyExchange::class, 'currency_id', 'id')
            ->from("clinic_{$clinicId}.currency_exchanges as currency_exchanges")
            ->latest('rate_date');   // <-- ВАЖНО!
    }

    
    public function history()
    {
        $clinicId = session('clinic_id');

        return $this->hasMany(CurrencyExchange::class, 'currency_id', 'id')
            ->from("clinic_{$clinicId}.currency_exchanges as currency_exchanges")
            ->orderBy('rate_date', 'desc');
    }


    public function getRateValueAttribute()
    {
        return $this->rate->rate_value ?? 1;
    }
}
