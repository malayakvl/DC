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
        Schema::create('document_operations', function (Blueprint $table) {
            $table->id();
            $table->dateTime('operation_date');
            $table->string('operation_number');
            $table->integer('document_id');
            $table->string('document_type');
            $table->string('operation_dt');
            $table->jsonb('subconto_dt');
            $table->string('operation_kt');
            $table->jsonb('subconto_kt');
            $table->float('quantity');
            $table->float('amount');
            $table->string('comment');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_operations');
    }
};
