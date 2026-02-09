<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OpeningBalanceItems extends Model
{
    use HasFactory;

    protected $table = 'opening_balance_items';

    protected $fillable = [
        'opening_balance_id',
        'material_id',
        'qty',
        'fact_qty',
        'price',
        'total',
        'price_per_unit',
        'unit_id',
        // сюда можно добавить поля source_type, source_id, если нужно
    ];

    public $timestamps = true;

    public function invoice()
    {
        return $this->belongsTo(OpeningBalance::class, 'invoice_id', 'id');
    }
}
