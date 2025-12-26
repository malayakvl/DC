<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoreMovements extends Model
{
    protected $table = 'store_movements';
    public $timestamps = true;

    protected $fillable = [
        'store_id',
        'material_id',
        'batch_id',
        'direction',       // 1 = приход, 2 = расход
        'qty',
        'fact_qty',
        'document_type',
        'document_id',
    ];

    protected $casts = [
        'qty' => 'float',
        'fact_qty' => 'float',
    ];

    // Связь с материалом
    public function material()
    {
        return $this->belongsTo(Material::class, 'material_id');
    }

    // Связь с партией
    public function batch()
    {
        return $this->belongsTo(StoreBatches::class, 'batch_id');
    }
}
