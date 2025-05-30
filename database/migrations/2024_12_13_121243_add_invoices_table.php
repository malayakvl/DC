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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number');
            $table->dateTime('invoice_date');
            $table->foreignId('status_id')->nullable()->index();
            $table->foreignId('customer_id')->nullable()->index();
            $table->foreignId('producer_id')->nullable()->index();
            $table->foreignId('store_id')->nullable()->index();
            $table->string('comment')->nullable()->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('size');
    }
};
