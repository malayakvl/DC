<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PriceCategory extends Model
{
    protected $fillable = [
        'name',
    ];

    public function children()
    {
        return $this->hasMany(PriceCategory::class, 'parent_id')->with('children');
    }

    public function producer()
    {
        if ($this->producer_id) {
            $producer = Producer::where('id', $this->producer_id)->get();
            return $producer[0]->name;
        }
    }
}
