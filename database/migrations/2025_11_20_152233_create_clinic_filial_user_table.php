<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Only create the table if it doesn't already exist
        if (!Schema::hasTable('clinic_filial_user')) {
            Schema::create('clinic_filial_user', function (Blueprint $table) {
                $table->id();
                $table->foreignId('clinic_id')->constrained()->onDelete('cascade');
                $table->foreignId('filial_id')->constrained()->onDelete('cascade');
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Only drop the table if it exists
        if (Schema::hasTable('clinic_filial_user')) {
            Schema::dropIfExists('clinic_filial_user');
        }
    }
};