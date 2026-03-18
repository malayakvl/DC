<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MoneyIn extends Model
{
    protected $table = 'money_out'; // вот здесь явно указываем

    protected $fillable = [
        'document_number',
        'document_date',
        'status',
        'filial_id',
        'account_id',
        'customer_id',
        'currency_id',
        'amount'
    ];

}
