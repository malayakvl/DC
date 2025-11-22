<?php

namespace App\Observers;

use App\Services\AuditLogService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class AuditLogObserver
{
    public function created(Model $model)
    {
        $this->log($model, 'created', null, $model->getAttributes());
    }

    public function updated(Model $model)
    {
        $changes = $model->getChanges();
        $old = $model->getOriginal();

        // Логируем только реальные изменения
        if (!empty($changes)) {
            $this->log($model, 'updated', $old, $changes);
        }
    }

    public function deleted(Model $model)
    {
        $this->log($model, 'deleted', $model->getOriginal(), null);
    }

    private function log(Model $model, string $action, $oldData, $newData)
    {
        $user = Auth::user();

        // Если нет пользователя — смотря по ситуации, можно логировать в system
        if (!$user) {
            return;
        }

        app(AuditLogService::class)->log(
            $user,
            $action,
            $model,
            $oldData,
            $newData
        );
    }
}
