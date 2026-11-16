<?php

namespace App\Http\Controllers;

use App\Http\Requests\CabinetUpdateRequest;
use App\Models\Clinic;
use App\Models\ClinicFilial;
use App\Models\Filial;
use App\Models\Cabinet;
use App\Models\Size;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use App\Services\AuditLogService;
use App\Services\ClinicSchemaService;

class CabinetController extends Controller
{

    protected AuditLogService $auditLogService;
    protected ClinicSchemaService $schemaService;

    public function __construct(ClinicSchemaService $schemaService, AuditLogService $auditLogService)
    {
        $this->schemaService = $schemaService;
        $this->auditLogService = $auditLogService;
    }


    /**
     * Helper для работы с текущей схемой клиники
     */
    private function withClinicSchema(Request $request, \Closure $callback)
    {
        $clinicId = $request->session()->get('clinic_id');
        if (!$clinicId) {
            abort(403, 'Clinic not selected in session.');
        }

        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;

        try {
            DB::statement("SET search_path TO clinic_{$clinicId}, public, core");
            return call_user_func($callback, $clinicId);
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            $clinic = $request->user()->clinicByFilial($clinicId);
            if (!$request->user()->canClinic('scheduler-view')) {
                return Inertia::render('Cabinet/List', ['error' => 'Insufficient permissions']);
            }

            $filialId = $request->session()->get('filial_id');
            if ($filialId) {
                $listData = DB::table('cabinets')
                    ->select('cabinets.*', "clinic_filials.name AS filial_name")
                    ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'cabinets.filial_id')
                    ->where('cabinets.filial_id', $request->session()->get('filial_id'))
                    ->orderBy('name')->get();
            } else {
                $listData = DB::table('cabinets')
                    ->select('cabinets.*', "clinic_filials.name AS filial_name")
                    ->leftJoin('clinic_filials', 'clinic_filials.id', '=', 'cabinets.filial_id')
                    ->orderBy('name')->get();
            }

            return Inertia::render('Cabinet/List', [
                'clinicData' => $clinic,
                'listData' => $listData,
            ]);
        });
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if (!$request->user()->canClinic('scheduler-edit')) {
                return Inertia::render('Cabinet/List', ['error' => 'Insufficient permissions']);
            }

            $clinicData = $request->user()->clinicByFilial($clinicId);
            $filialId = $request->session()->get('filial_id');

            $filialData = DB::table('clinic_filials')
                ->select('clinic_filials.*')
                ->where('clinic_filials.clinic_id', $clinicData->id)
                ->orderBy('name')->get();

            $formData = new Cabinet();
            return Inertia::render('Cabinet/Create', [
                'clinicData' => $clinicData,
                'filialData' => $filialData,
                'formData' => $formData,
            ]);
        });
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id) {
        return $this->withClinicSchema($request, function($clinicId) use ($request, $id) {
            if (!$request->user()->canClinic('scheduler-edit')) {
                return Inertia::render('Cabinet/List', ['error' => 'Insufficient permissions']);
            }
            
            $clinicData = $request->user()->clinicByFilial($clinicId);
            $filialData = DB::table('clinic_filials')
                ->select('clinic_filials.*')
                ->where('clinic_filials.clinic_id', $clinicData->id)
                ->orderBy('name')->get();
            $formData = Cabinet::find($id);
            return Inertia::render('Cabinet/Edit', [
                'clinicData' => $clinicData,
                'filialData' => $filialData,
                'formData' => $formData,
            ]);
        });
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CabinetUpdateRequest $request) {
        return $this->withClinicSchema($request, function($clinicId) use ($request) {
            if ($request->user()->can('scheduler-edit')) {
                if ($request->id)
                    $cabinet = Cabinet::find($request->id);
                else {
                    $cabinet = new Cabinet();
                }
                $cabinet->fill($request->validated());
                $cabinet->save();
                if ($request->filial_id) {
                    $cabinet->filial_id = $request->filial_id;
                    $cabinet->save();
                }

                return Redirect::route('cabinet.index');
            }
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
                // Ищем conversation_id напрямую по таблице сообщений, где есть вы двое
                $conversationId = DB::table('ch_messages as m')
                    ->join('ch_conversations as c', 'c.id', '=', 'm.conversation_id')
                    ->where('c.type', 'direct')
                    ->where('c.created_by', $user->id)
                    ->orWhere('c.receiver_by', $user->id)
                    ->orderBy('m.created_at', 'desc')
                    ->value('c.id');


//                $conversationId = DB::table('ch_messages as m')
//                    ->join('ch_conversations as c', 'c.id', '=', 'm.conversation_id')
//                    ->where('c.type', 'direct')
//                    ->where(function ($q) use ($currentUserId, $user) {
//                        $q->where(function ($sub) use ($currentUserId, $user) {
//                            $sub->where('m.user_id', $currentUserId);
//                        })->orWhere(function ($sub) use ($currentUserId, $user) {
//                            $sub->where('m.user_id', $user->id);
//                        });
//                    })
//                    // Проверяем, что в этом чате есть сообщения обоих или хотя бы чат создан кем-то из вас
//                    ->where(function ($q) use ($currentUserId, $user) {
//                        $q->where('c.created_by', $currentUserId)
//                            ->orWhere('c.created_by', $user->id);
//                    })
//                    ->orderBy('m.created_at', 'desc')
//                    ->value('c.id');
                // Запасной поиск, если сообщений еще не было, но чат создан
//                if (!$conversationId) {
//
//                    $conversationId = DB::table('ch_conversations')
//                        ->where('type', 'direct')
//                        ->where(function ($q) use ($currentUserId, $user) {
//                            $q->where('receiver_by', $currentUserId)
//                                ->orWhere('receiver_by', $user->id);
//                        })
//                        ->value('id');
//                }

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
//                dd($lastMessage);
//                if ($conversationId && $lastMessage)
                if ($conversationId) {
                    $result[] = [
                        'id' => $conversationId, // Теперь здесь точно подтянется UUID твоего чата!
                        'peer' => [
                            'id' => $user->id,
                            'first_name' => $user->first_name,
                            'last_name' => $user->last_name,
                            'avatar' => $user->avatar,
                        ],
                        'last_message' => $lastMessage ? $lastMessageText : '',
                        'last_time' => $lastTime,
                        'unread_count' => $unreadCount,
                    ];
                } else {

                }
            }
            return response()->json([
                'status' => 'success',
                'data' => $result,
            ]);
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cabinet $cabinet) {
        //
    }
}
