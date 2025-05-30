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
        Schema::create('invoice_operations', function (Blueprint $table) {
            $table->id();
            $table->dateTime('invoice_date');
            $table->string('invoice_number');
            $table->foreignId('invoice_id')->index();
            $table->foreignId('store_id')->index();
            $table->foreignId('material_id')->index();
            $table->integer('quantity');
            $table->string('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_operations');
    }
};
