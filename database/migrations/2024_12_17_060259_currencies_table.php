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
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });
        Schema::create('currency_exchange', function (Blueprint $table) {
            $table->foreignId('currency_id')->index();
            $table->timestamp('rate_date');
            $table->float('rate_value');
//            $table->timestamp('created_at')->nullable();
//            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('currencies');
    }
};
