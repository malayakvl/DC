<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaterialCategories extends Model
{
    protected $fillable = [
        'name',
        'parent_id',
        'percent'
    ];

    public function children()
    {
        return $this->hasMany(MaterialCategories::class, 'parent_id')->with('children');
    }

    public function producer()
    {
        if ($this->producer_id) {
            $producer = Producer::where('id', $this->producer_id)->get();
            return $producer[0]->name;
        }
    }
}
