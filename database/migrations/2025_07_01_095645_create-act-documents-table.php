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
        //
        Schema::create('act_documents', function (Blueprint $table) {
            $table->id();
            $table->string('doc_number');
            $table->dateTime('doc_date');
            $table->foreignId('clinic_id')->nullable()->index();
            $table->foreignId('filial_id')->nullable()->index();
            $table->foreignId('doctor_id')->nullable()->index();
            $table->foreignId('patient_id')->nullable()->index();
            $table->foreignId('schedule_id')->nullable()->index();
            $table->foreignId('currency_id')->nullable()->index();
            $table->float('discount')->nullable();
            $table->float('total')->nullable();
            $table->float('total_with_discount')->nullable();
            $table->string('services')->nullable()->index();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('act_documents');
    }
};
