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
        // Only run if table exists
        if (Schema::hasTable('store_materials')) {
            Schema::table('store_materials', function($table) {
                // Only drop weight column if it exists
                if (Schema::hasColumn('store_materials', 'weight')) {
                    $table->dropColumn('weight');
                }
                
                // Add new columns if they don't exist
                if (!Schema::hasColumn('store_materials', 'pack_qty')) {
                    $table->float('pack_qty')->nullable();
                }
                if (!Schema::hasColumn('store_materials', 'pack_unit_id')) {
                    $table->foreignId('pack_unit_id')->nullable()->index();
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Only run if table exists
        if (Schema::hasTable('store_materials')) {
            Schema::table('store_materials', function($table) {
                if (Schema::hasColumn('store_materials', 'pack_qty')) {
                    $table->dropColumn('pack_qty');
                }
                if (Schema::hasColumn('store_materials', 'pack_unit_id')) {
                    $table->dropColumn('pack_unit_id');
                }
            });
        }
    }
};