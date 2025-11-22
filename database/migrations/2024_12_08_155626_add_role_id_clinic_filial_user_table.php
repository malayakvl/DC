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
        // Create the table if it doesn't exist
        if (!Schema::hasTable('clinic_filial_user')) {
            Schema::create('clinic_filial_user', function (Blueprint $table) {
                $table->id();
                $table->foreignId('clinic_id')->constrained()->onDelete('cascade');
                $table->foreignId('filial_id')->constrained()->onDelete('cascade');
                $table->foreignId('user_id')->constrained()->onDelete('cascade');
                $table->timestamps();
            });
        }
        
        // Add the role_id column
        Schema::table('clinic_filial_user', function($table) {
            $table->foreignId('role_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('clinic_filial_user', function($table) {
            $table->dropColumn('role_id');
        });
    }
};