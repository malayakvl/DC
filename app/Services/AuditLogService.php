<?php

namespace App\Services;

use App\Models\AuditLog;
use Illuminate\Support\Facades\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AuditLogService
{
    public function log(?User $user, string $action, $entity = null, array $oldData = null, array $newData = null)
    {
        // Если пользователя нет (для каких-то системных действий)
        $userId = $user ? $user->id : null;

        // Тип и id сущности
        $entityType = $entity && is_object($entity) ? get_class($entity) : 'system';
        $entityId   = $entity && isset($entity->id) ? $entity->id : null;

        // clinic и filial
        $clinicId = $entity && isset($entity->clinic_id) ? $entity->clinic_id : null;
        $filialId = $entity && isset($entity->filial_id) ? $entity->filial_id : null;

        // Если clinic_id не найден в сущности, попробуем получить из сессии
        if (!$clinicId) {
            $clinicId = request()->session()->get('clinic_id');
        }

        // Всегда пишем в схему клиники если clinic_id доступен
        if ($clinicId) {
            return $this->logToClinicSchema($userId, $action, $entityType, $entityId, $oldData, $newData, $clinicId, $filialId);
        } else {
            // Для системных действий без клиники - логируем предупреждение
            Log::warning('Audit log entry without clinic context', [
                'user_id' => $userId,
                'action' => $action,
                'entity_type' => $entityType,
                'entity_id' => $entityId
            ]);
            
            // Пишем в core schema как fallback
            return AuditLog::create([
                'user_id'     => $userId,
                'entity_type' => $entityType ?: 'system',
                'entity_id'   => $entityId ?: null,
                'action'      => $action,
                'old_data'    => $oldData ? json_encode($oldData) : null,
                'new_data'    => $newData ? json_encode($newData) : null,
                'clinic_id'   => $clinicId,
                'filial_id'   => $filialId,
                'ip_address'  => request()->ip(),
            ]);
        }
    }

    protected function logToClinicSchema($userId, $action, $entityType, $entityId, $oldData, $newData, $clinicId, $filialId)
    {
        $schemaName = 'clinic_' . $clinicId;
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;

        try {
            // Переключаемся на схему клиники
            DB::statement("SET search_path TO {$schemaName}");

            // Пишем в таблицу audit_logs в схеме клиники
            $auditLog = AuditLog::create([
                'user_id'     => $userId,
                'entity_type' => $entityType ?: 'system',
                'entity_id'   => $entityId ?: null,
                'action'      => $action,
                'old_data'    => $oldData ? json_encode($oldData) : null,
                'new_data'    => $newData ? json_encode($newData) : null,
                'clinic_id'   => $clinicId,
                'filial_id'   => $filialId,
                'ip_address'  => request()->ip(),
            ]);

            return $auditLog;
        } finally {
            // Возвращаем оригинальный search_path
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }

    public function getLogs(array $filters = [])
    {
        $query = AuditLog::query();

        if (!empty($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }
        if (!empty($filters['entity_type'])) {
            $query->where('entity_type', $filters['entity_type']);
        }
        if (!empty($filters['entity_id'])) {
            $query->where('entity_id', $filters['entity_id']);
        }
        if (!empty($filters['clinic_id'])) {
            $query->where('clinic_id', $filters['clinic_id']);
        }
        if (!empty($filters['filial_id'])) {
            $query->where('filial_id', $filters['filial_id']);
        }
        if (!empty($filters['from'])) {
            $query->where('created_at', '>=', $filters['from']);
        }
        if (!empty($filters['to'])) {
            $query->where('created_at', '<=', $filters['to']);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }
}