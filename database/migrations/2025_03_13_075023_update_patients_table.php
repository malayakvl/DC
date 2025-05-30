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
        Schema::table('patients', function($table) {
            $table->string('phone2')->nullable();
            $table->float('discount')->nullable();
            $table->string('address')->nullable();
            $table->string('gender')->nullable();
            $table->date('birthday')->nullable();
            $table->date('register_date')->nullable();
            $table->text('important_info')->nullable();
            $table->string('card_number')->nullable();
            $table->foreignId('doctor_id')->nullable()->index();
            $table->string('contact')->nullable();
            $table->string('status')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
