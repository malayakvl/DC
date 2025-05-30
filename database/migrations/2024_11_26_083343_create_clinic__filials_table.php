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
        Schema::create('clinic_filials', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->string('uraddress');
            $table->string('inn');
            $table->string('edrpou');
            $table->string('phone');
            $table->foreignId('clinic_id')->nullable()->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinic_filials');
    }
};
