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
//        Schema::table('store_materials', function($table) {
//            $table->dropColumn('store_id');
//            $table->dropColumn('material_id');
//            $table->dropColumn('producer_id');
//            $table->dropColumn('quantity');
//            $table->dropColumn('unit_id');
//            $table->dropColumn('doc_date');
//            $table->dropColumn('price_per_unit');
//            $table->dropColumn('pack_qty');
//            $table->dropColumn('pack_unit_id');
//        });
        Schema::create('store_materials', function (Blueprint $table) {
            $table->id();
            $table->dateTime('doc_date');
            $table->foreignId('store_id')->nullable()->index();
            $table->foreignId('material_id')->nullable()->index();
            $table->float('qty')->nullable();
            $table->foreignId('unit_id')->nullable()->index();
            $table->float('fact_qty')->nullable();
            $table->foreignId('fact_unit_id')->nullable()->index();
            $table->float('price_per_unit')->nullable();
            $table->timestamps();
        });
//        Schema::create('store_materials', function($table) {
//            $table->dateTime('doc_date')->nullable();;
//            $table->foreignId('store_id')->nullable();;
//            $table->foreignId('material_id')->nullable();;
//            $table->float('quantity')->nullable();;
//            $table->foreignId('unit_id')->nullable();;
//            $table->float('fact_qty')->index();
//            $table->foreignId('fact_unit_id')->index();
//            $table->float('price_per_unit')->index();
//        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
