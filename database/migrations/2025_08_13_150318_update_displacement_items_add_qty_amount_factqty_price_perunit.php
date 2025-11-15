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
        Schema::table('displacement_items', function($table) {
            $table->float('price');
            $table->float('total');
            $table->float('fact_qty');
            $table->float('price_per_unit');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('displacement_items', function($table) {
            $table->dropColumn('price');
            $table->dropColumn('total');
            $table->dropColumn('fact_qty');
            $table->dropColumn('price_per_unit');
        });
    }
};
