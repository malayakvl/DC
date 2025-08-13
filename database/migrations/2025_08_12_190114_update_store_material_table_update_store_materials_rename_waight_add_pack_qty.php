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
            $table->dropColumn('weight');
        });

        Schema::table('store_materials', function($table) {
            $table->float('pack_qty')->nullable();;
            $table->foreignId('pack_unit_id')->index();
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
