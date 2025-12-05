<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ClinicUser extends Model
{
    protected $fillable = [
        'clinic_id',
        'user_id',
        'role_id'
    ];
    
    protected $table = 'clinic_user';
    
    // Create a method to save in core schema
    public static function createInCore($attributes)
    {
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        
        try {
            DB::statement("SET search_path TO core");
            return static::create($attributes);
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }
    
    // Create a method to find in core schema
    public static function findInCore($id)
    {
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        
        try {
            DB::statement("SET search_path TO core");
            return static::find($id);
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }

    public function clinic(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Clinic::class);
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class);
    }
}