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
        Schema::create('store_materials', function (Blueprint $table) {
            $table->id();
            $table->dateTime('doc_date')->nullable();
            $table->string('document_type')->nullable();
            $table->bigInteger('document_id')->nullable();
            $table->foreignId('store_id')->nullable()->index();
            $table->foreignId('material_id')->nullable()->index();
            $table->foreignId('producer_id')->nullable()->index();
            $table->float('qty')->nullable();
            $table->float('store_qty')->nullable();
            $table->foreignId('unit_id')->nullable()->index();
            $table->float('fact_qty')->nullable();
            $table->float('store_fact_qty')->nullable();
            $table->foreignId('fact_unit_id')->nullable()->index();
            $table->float('price_per_unit')->nullable();
            $table->float('pack_qty')->nullable();
            $table->foreignId('pack_unit_id')->nullable()->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('store_materials');
    }
};
