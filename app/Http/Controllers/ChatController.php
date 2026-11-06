<?php
namespace App\Http\Controllers;

use App\Services\AuditLogService;
use App\Services\CustomerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Message;
use App\Models\Conversation;
use Illuminate\Support\Str;


class ChatController extends Controller
{
    protected AuditLogService $auditLogService;

    protected CustomerService $customerService;

    /**
     * Helper для работы с текущей схемой клиники
     */
    public function __construct(AuditLogService $auditLogService, CustomerService $customerService)
    {
        $this->auditLogService = $auditLogService;
        $this->customerService = $customerService;
    }

    private function withClinicSchema(Request $request, \Closure $callback)
    {
        $clinicId = $request->session()->get('clinic_id');
        if (!$clinicId) {
            abort(403, 'Clinic not selected in session.');
        }

        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;

        try {
            // 🔹 Добавляем public и core в search_path, чтобы модели могли найти свои таблицы
            DB::statement("SET search_path TO clinic_{$clinicId}, public, core");
            return $callback($clinicId);
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }

    public function getChatCustomers(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinicData = $request->user()->clinicByFilial($clinicId);

            $customerData = DB::table('core.clinic_user as cu')
                ->join('core.users as u', 'cu.user_id', '=', 'u.id')
                ->leftJoin("clinic_{$clinicId}.patients as pt", 'pt.user_id', '=', 'u.id')
                ->where('cu.clinic_id', $clinicId)
                ->whereNull('pt.id') // 💥 вот ключевая строка
                ->select(
                    'u.id',
                    'u.first_name',
                    'u.last_name',
                    'u.email',
                    'cu.avatar'
                )
                ->orderBy('u.last_name')
                ->get();

            return response()->json([
                'status' => 'success',
                'clinic_id' => $clinicId,
                'search_path' => 'clinic_1',
                'data' => $customerData
            ]);
        });
    }


    public function saveMessage(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $schema = is_numeric($clinicId) ? "clinic_{$clinicId}" : $clinicId;
            // Не проверяем через exists по чужим таблицам, просто принимаем ID
            $validated = $request->validate([
                'recipient_id' => ['required'], // Это может быть ID клиента или юзера
                'body' => ['required', 'string'],
                'kind' => ['nullable', 'string', 'max:20'],
            ]);

            $currentUserId = $request->user()->id;
            $recipientId = $validated['recipient_id'];
            // Ищем существующий разговор в схеме клиники
            $conversation = \DB::table("ch_conversations as c")
                ->where('c.type', 'direct')
                ->where(function($query) use ($currentUserId, $recipientId) {
                    $query->where('c.created_by', $currentUserId)
                        ->orWhere('c.created_by', $recipientId);
                })
                ->first();

            // Если разговора нет — создаем новый с UUID
            if (!$conversation) {
                $conversationId = (string) Str::uuid();
                \DB::table("ch_conversations")->insert([
                    'id' => $conversationId,
                    'type' => 'direct',
                    'created_by' => $currentUserId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            } else {
                $conversationId = $conversation->id;
            }
            // Сохраняем само сообщение в ch_messages
            \DB::table("ch_messages")->insert([
                'id' => (string) Str::uuid(),
                'conversation_id' => $conversationId,
                'user_id' => $currentUserId,
                'kind' => $validated['kind'] ?? 'user',
                'body' => $validated['body'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return redirect()->back();
        });
    }

    public function getConversations(Request $request)
    {
        return $this->withClinicSchema($request, function ($clinicId) use ($request) {
            $currentUserId = $request->user()->id;


            // Берем всех сотрудников клиники, кроме себя и пациентов
            $users = DB::table('core.clinic_user as cu')
                ->join('core.users as u', 'cu.user_id', '=', 'u.id')
                ->leftJoin("clinic_{$clinicId}.patients as pt", 'pt.user_id', '=', 'u.id')
                ->where('cu.clinic_id', $clinicId)
                ->where('u.id', '!=', $currentUserId)
                ->whereNull('pt.id') // 💥 вот ключевая строка
                ->select(
                    'u.id',
                    'u.first_name',
                    'u.last_name',
                    'u.email',
                    'cu.avatar'
                )
                ->orderBy('u.last_name')
                ->get();
            $result = [];

            foreach ($users as $user) {
                // Ищем диалог строго между нами и этим коллегой
                $conversationId = DB::table('ch_conversations')
                    ->where('type', 'direct')
                    ->where(function ($q) use ($currentUserId, $user) {
                        $q->where(function ($sub) use ($currentUserId, $user) {
                            $sub->where('created_by', $currentUserId)
                                ->where('receiver_by', $user->id);
                        })->orWhere(function ($sub) use ($currentUserId, $user) {
                            $sub->where('created_by', $user->id)
                                ->where('receiver_by', $currentUserId);
                        });
                    })
                    ->value('id');

                $lastMessageText = 'Ще немає повідомлень';
                $lastTime = null;
                $unreadCount = 0;

                if ($conversationId) {
                    $lastMessage = DB::table("ch_messages")
                        ->where('conversation_id', $conversationId)
                        ->orderBy('created_at', 'desc')
                        ->first();

                    if ($lastMessage) {
                        $lastMessageText = $lastMessage->body ?: '📎 Файл';
                        $lastTime = date('H:i', strtotime($lastMessage->created_at));
                    }

                    $unreadCount = DB::table("ch_messages")
                        ->where('conversation_id', $conversationId)
                        ->where('user_id', '!=', $currentUserId)
                        ->count();
                }

                // 💥 ВОТ ЭТОТ БЛОК ДОЛЖЕН БЫТЬ ВНЕ ИФА, чтобы попадали ВСЕ сотрудники!
                $result[] = [
                    'id' => $conversationId, // null для новых, UUID для существующих
                    'peer' => [
                        'id' => $user->id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'avatar' => $user->avatar,
                    ],
                    'last_message' => $lastMessageText,
                    'last_time' => $lastTime,
                    'unread_count' => $unreadCount,
                ];
            }

            return response()->json([
                'status' => 'success',
                'data' => $result,
            ]);
        });
    }

    public function markAsRead(Request $request, $conversationId)
    {
        return $this->withClinicSchema($request, function ($clinicId) use ($request, $conversationId) {
            $currentUserId = $request->user()->id;

            // Помечаем как прочитанные все сообщения в этом чате, которые отправлял НЕ ты
            DB::table('ch_messages')
                ->where('conversation_id', $conversationId)
                ->where('user_id', '!=', $currentUserId)
                ->whereNull('read_at') // если используешь поле read_at ( timestamp )
                ->update(['read_at' => now()]);

            return response()->json(['status' => 'success']);
        });
    }

    public function getConversations0(Request $request)
    {
        return $this->withClinicSchema($request, function ($clinicId) use ($request) {
            $currentUserId = $request->user()->id;


            // Берем всех сотрудников клиники, кроме себя и пациентов
            $users = DB::table('core.clinic_user as cu')
                ->join('core.users as u', 'cu.user_id', '=', 'u.id')
                ->leftJoin("clinic_{$clinicId}.patients as pt", 'pt.user_id', '=', 'u.id')
                ->where('cu.clinic_id', $clinicId)
                ->where('u.id', '!=', $currentUserId)
                ->whereNull('pt.id') // 💥 вот ключевая строка
                ->select(
                    'u.id',
                    'u.first_name',
                    'u.last_name',
                    'u.email',
                    'cu.avatar'
                )
                ->orderBy('u.last_name')
                ->get();

            $result = [];

            foreach ($users as $user) {
                // Ищем conversation_id напрямую по таблице сообщений, где есть вы двое
                $conversationId = DB::table('ch_messages as m')
                    ->join('ch_conversations as c', 'c.id', '=', 'm.conversation_id')
                    ->where('c.type', 'direct')
                    ->where(function ($q) use ($currentUserId, $user) {
                        $q->where(function ($sub) use ($currentUserId, $user) {
                            $sub->where('m.user_id', $currentUserId);
                        })->orWhere(function ($sub) use ($currentUserId, $user) {
                            $sub->where('m.user_id', $user->id);
                        });
                    })
                    // Проверяем, что в этом чате есть сообщения обоих или хотя бы чат создан кем-то из вас
                    ->where(function ($q) use ($currentUserId, $user) {
                        $q->where('c.created_by', $currentUserId)
                            ->orWhere('c.created_by', $user->id);
                    })
                    ->orderBy('m.created_at', 'desc')
                    ->value('c.id');

                // Запасной поиск, если сообщений еще не было, но чат создан
                if (!$conversationId) {
                    $conversationId = DB::table('ch_conversations')
                        ->where('type', 'direct')
                        ->where(function ($q) use ($currentUserId, $user) {
                            $q->where('created_by', $currentUserId)
                                ->orWhere('created_by', $user->id);
                        })
                        ->value('id');
                }

                $lastMessageText = 'Ще немає повідомлень';
                $lastTime = null;
                $unreadCount = 0;

                if ($conversationId) {
                    $lastMessage = DB::table("ch_messages")
                        ->where('conversation_id', $conversationId)
                        ->orderBy('created_at', 'desc')
                        ->first();

                    if ($lastMessage) {
                        $lastMessageText = $lastMessage->body ?: '📎 Файл';
                        $lastTime = date('H:i', strtotime($lastMessage->created_at));
                    }

                    $unreadCount = DB::table("ch_messages")
                        ->where('conversation_id', $conversationId)
                        ->where('user_id', '!=', $currentUserId)
                        ->count();
                }

                $result[] = [
                    'id' => $conversationId, // Теперь здесь точно подтянется UUID твоего чата!
                    'peer' => [
                        'id' => $user->id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'avatar' => $user->avatar,
                    ],
                    'last_message' => $lastMessageText,
                    'last_time' => $lastTime,
                    'unread_count' => $unreadCount,
                ];
            }

            return response()->json([
                'status' => 'success',
                'data' => $result,
            ]);
        });
    }

    public function getConversationsOld(Request $request)
    {
        return $this->withClinicSchema($request, function ($clinicId) use ($request) {
            $currentUserId = $request->user()->id;

            $users = DB::table('core.clinic_user as cu')
                ->join('core.users as u', 'cu.user_id', '=', 'u.id')
                ->leftJoin("clinic_{$clinicId}.patients as pt", 'pt.user_id', '=', 'u.id')
                ->where('cu.clinic_id', $clinicId)
                ->whereNull('pt.id')
                ->where('u.id', '!=', $currentUserId)
                ->select('u.id', 'u.first_name', 'u.last_name', 'cu.avatar')
                ->get();

            $result = [];

            foreach ($users as $user) {
                // Ищем уникальный диалог между нами и конкретным коллегой
                $conversationId = DB::table('ch_conversations as c')
                    ->join('ch_conversation_participants as p1', 'p1.conversation_id', '=', 'c.id')
                    ->join('ch_conversation_participants as p2', 'p2.conversation_id', '=', 'c.id')
                    ->where('c.type', 'direct')
                    ->where('p1.user_id', $currentUserId)
                    ->where('p2.user_id', $user->id)
                    ->value('c.id');

                $lastMessageText = 'Ще немає повідомлень';
                $lastTime = null;
                $unreadCount = 0;

                if ($conversationId) {
                    $lastMessage = DB::table("ch_messages")
                        ->where('conversation_id', $conversationId)
                        ->orderBy('created_at', 'desc')
                        ->first();

                    if ($lastMessage) {
                        $lastMessageText = $lastMessage->body ?: '📎 Файл';
                        $lastTime = date('H:i', strtotime($lastMessage->created_at));
                    }

                    $unreadCount = DB::table("ch_messages")
                        ->where('conversation_id', $conversationId)
                        ->where('user_id', '!=', $currentUserId)
                        ->count();
                }

                $result[] = [
                    'id' => $conversationId,
                    'peer' => [
                        'id' => $user->id,
                        'first_name' => $user->first_name,
                        'last_name' => $user->last_name,
                        'avatar' => $user->avatar,
                    ],
                    'last_message' => $lastMessageText,
                    'last_time' => $lastTime,
                    'unread_count' => $unreadCount,
                ];
            }

            return response()->json([
                'status' => 'success',
                'data' => $result,
            ]);
        });
    }

    public function getMessages(Request $request, $conversationId)
    {
        return $this->withClinicSchema($request, function ($clinicId) use ($request, $conversationId) {
            $currentUserId = $request->user()->id;

            // Если пришел не UUID, а ID пользователя (или поиск по peer)
            if (!preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i', $conversationId)) {
                $peerId = $conversationId;

                // Ищем существующий диалог между текущим пользователем и этим коллегой
                $conversationId = DB::table('ch_conversations as c')
                    ->where('c.type', 'direct')
                    ->where(function ($q) use ($currentUserId, $peerId) {
                        $q->where(function ($sub) use ($currentUserId, $peerId) {
                            $sub->where('c.created_by', $currentUserId);
                        })->orWhere(function ($sub) use ($currentUserId, $peerId) {
                            $sub->where('c.created_by', $peerId);
                        });
                    })
                    ->whereExists(function ($query) use ($currentUserId, $peerId) {
                        $query->select(DB::raw(1))
                            ->from('ch_messages')
                            ->whereColumn('ch_messages.conversation_id', 'ch_conversations.id')
                            ->whereIn('user_id', [$currentUserId, $peerId]);
                    })
                    ->value('c.id');

                // Если диалога нет вообще, возвращаем пустой массив сообщений без ошибок 500
                if (!$conversationId) {
                    return response()->json([
                        'status' => 'success',
                        'data' => [],
                    ]);
                }
            }

            $messages = DB::table("ch_messages")
                ->where('conversation_id', $conversationId)
                ->orderBy('created_at', 'asc')
                ->get()
                ->map(function ($msg) use ($request) {
                    return [
                        'id' => $msg->id,
                        'body' => $msg->body,
                        'attachment' => isset($msg->attachment) && $msg->attachment ? json_decode($msg->attachment) : null,
                        'sender' => $msg->user_id == $request->user()->id ? 'me' : 'peer',
                        'time' => date('H:i', strtotime($msg->created_at)),
                    ];
                });

            return response()->json([
                'status' => 'success',
                'data' => $messages,
            ]);
        });
    }



    public function getMessagesOld(Request $request, $conversationId)
    {
        return $this->withClinicSchema($request, function ($clinicId) use ($request, $conversationId) {
            $messages = DB::table("ch_messages")
                ->where('conversation_id', $conversationId)
                ->orderBy('created_at', 'asc')
                ->get()
                ->map(function ($msg) use ($request) {
                    return [
                        'id' => $msg->id,
                        'body' => $msg->body,
                        'attachment' => isset($msg->attachment) && $msg->attachment ? json_decode($msg->attachment) : null,
                        'sender' => $msg->user_id == $request->user()->id ? 'me' : 'peer',
                        'time' => date('H:i', strtotime($msg->created_at)),
                    ];
                });

            return response()->json([
                'status' => 'success',
                'data' => $messages,
            ]);
        });
    }
}