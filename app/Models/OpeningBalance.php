<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OpeningBalance extends Model
{
    use HasFactory;

    protected $table = 'opening_balances';

    protected $fillable = [
        'ob_number',
        'ob_date',
        'status',
        'type',
        'document_type',
        'filial_id',
    ];

    public $timestamps = true;

    public function items()
    {
        return $this->hasMany(OpeningBalanceItems::class, 'invoice_id', 'id');
    }
}
