<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ChatController;

// Убираем auth:sanctum, оставляем изоляцию схемы клиники
Route::middleware(['api', \App\Http\Middleware\SetClinicSchema::class])->group(function () {
    Route::get('/chatify/v1/users', [ChatController::class, 'getChatCustomers'])->name('chat.customers');

//    Route::get('/chatify/v1/users', function (Request $request) {
//        $users = DB::table('users')->select('id', 'name', 'email')->get();
//
//        return response()->json([
//            'status' => 'success',
//            'clinic_id' => session('clinic_id'),
//            'search_path' => DB::select("SHOW search_path")[0]->search_path,
//            'data' => $users
//        ]);
//    });

    Route::get('/chatify/v1/conversations', function (Request $request) {
        return response()->json([
            'status' => 'success',
            'conversations' => [
                [
                    'id' => 1,
                    'name' => 'Головний лікар / Адмін',
                    'last_message' => 'Привіт! Як пройшов прийом пацієнта?',
                    'updated_at' => now()->toIso8601String(),
                ]
            ]
        ]);
    });
});