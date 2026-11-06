<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class EnsureClinicSchema
{
    public function handle(Request $request, Closure $next): Response
    {
        $clinicId = $request->session()->get('clinic_id');

        if (!$clinicId) {
            abort(403, 'Clinic not selected in session.');
        }

        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;

        try {
            // Переключаем search_path на схему клиники, public и core
            DB::statement("SET search_path TO clinic_{$clinicId}, public, core");

            return $next($request);
        } finally {
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }
}
