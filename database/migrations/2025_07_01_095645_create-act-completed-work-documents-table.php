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
        Schema::create('act_completed_works', function (Blueprint $table) {
            $table->id();
            $table->string('doc_number');
            $table->dateTime('doc_date');
            $table->foreignId('doctor_id')->nullable()->index();
            $table->foreignId('customer_id')->nullable()->index();
            $table->foreignId('schedule_id')->nullable()->index();
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
        Schema::dropIfExists('act_completed_works');
    }
};
