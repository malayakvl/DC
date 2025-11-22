<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class ClinicFilialUser extends Model
{
    protected $table = 'clinic_filial_user';
    protected $fillable = ['clinic_id','filial_id','user_id','role_id','created_at','updated_at'];

    public function clinic()
    {
        return $this->belongsTo(Clinic::class, 'clinic_id');
    }

    public function filial()
    {
        return $this->belongsTo(ClinicFilial::class, 'filial_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id');
    }
}
