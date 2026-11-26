<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class PatientDocument extends Model
{
    protected $table = 'patient_documents';

    protected $fillable = [
        'patient_id',
        'category',
        'tooth',
        'note',
        'original_name',
        'disk',
        'file_path',
        'mime_type',
        'size',
        'uploaded_by',
    ];

    protected $casts = [
        'patient_id'  => 'integer',
        'size'        => 'integer',
        'uploaded_by' => 'integer',
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
    ];

    protected $appends = [
        'url',
    ];

    public function getUrlAttribute(): string
    {
        if (!$this->file_path) {
            return '';
        }

        return Storage::disk($this->disk ?: 'public')->url($this->file_path);
    }
}