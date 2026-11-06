<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasUuids;

    protected $table = 'ch_messages';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'conversation_id',
        'user_id',
        'kind',
        'body',
        'attachment',
        'system_event',
        'edited_at',
        'reply_to_message_id',
        'forwarded_from_message_id',
        'deleted_at',
    ];

    protected $casts = [
        'attachment' => 'array',
        'system_event' => 'array',
        'edited_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    // Связь с разговором
    public function conversation()
    {
        return $this->belongsTo(Conversation::class, 'conversation_id');
    }
}