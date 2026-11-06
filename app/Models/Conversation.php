<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    use HasUuids; // Автоматически генерирует UUID для поля id

    protected $table = 'ch_conversations';

    // Указываем, что primary key — это string (uuid), а не инкрементный int
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'type',
        'name',
        'description',
        'avatar',
        'created_by',
    ];

    // Связь с сообщениями
    public function messages()
    {
        return $this->hasMany(Message::class, 'conversation_id');
    }
}
