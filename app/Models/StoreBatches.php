<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class StoreBatches extends Model
{
    protected $table = 'store_batches';
    public $timestamps = true;

    protected $fillable = [
        'store_id',
        'material_id',
        'supplier_id',
        'invoice_id',
        'arrived_at',
        'qty',
        'qty_left',
        'fact_qty',
        'fact_qty_left',
        'price_per_unit',
    ];

    protected $casts = [
        'arrived_at' => 'date',
        'qty' => 'float',
        'qty_left' => 'float',
        'fact_qty' => 'float',
        'fact_qty_left' => 'float',
        'price_per_unit' => 'float',
    ];

    // Связь с материалом
    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id');
    }

    // Связь с поставщиком
    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    // Связь с накладной
    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'invoice_id');
    }

    // Получение движений по этой партии
    public function movements()
    {
        return $this->hasMany(StoreMovements::class, 'batch_id');
    }
}
