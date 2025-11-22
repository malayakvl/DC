<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TenantContextMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        logger('TenantContextMiddleware: session_id='.session()->getId().' clinic_id='.session('clinic_id').' filial_id='.session('filial_id'));

        if (Auth::check()) {
            // Подтягиваем clinic_id если сессия пустая
            if (!$request->session()->has('clinic_id')) {
                $row = DB::table('core.user_clinic_roles')
                    ->where('user_id', Auth::id())
                    ->first();
                if ($row) {
                    $request->session()->put('clinic_id', $row->clinic_id);
                }
            }

            // Подтягиваем filial_id если отсутствует
            if ($request->session()->has('clinic_id') && !$request->session()->has('filial_id')) {
                $clinicId = $request->session()->get('clinic_id');
                $original = DB::select("SHOW search_path")[0]->search_path;
                try {
                    DB::statement("SET search_path TO clinic_{$clinicId}");
                    $filial = DB::table('clinic_filials')->where('clinic_id', $clinicId)->first();
                    if ($filial) {
                        $request->session()->put('filial_id', $filial->id);
                    }
                } finally {
                    DB::statement("SET search_path TO {$original}");
                }
            }
        }

        return $next($request);
    }
}
