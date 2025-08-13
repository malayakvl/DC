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
        Schema::table('store_materials', function($table) {
            $table->dateTime('doc_date')->nullable();;
            $table->float('price_per_unit')->nullable();;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('store_materials', function($table) {
            $table->dropColumn('doc_date');
            $table->dropColumn('price_per_unit');
        });
    }
};
