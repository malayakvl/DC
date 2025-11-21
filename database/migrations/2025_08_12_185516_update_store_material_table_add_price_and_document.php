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
                // Only add columns if they don't already exist
                if (!Schema::hasColumn('store_materials', 'doc_date')) {
                    $table->dateTime('doc_date')->nullable();
                }
                if (!Schema::hasColumn('store_materials', 'price_per_unit')) {
                    $table->float('price_per_unit')->nullable();
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
                if (Schema::hasColumn('store_materials', 'doc_date')) {
                    $table->dropColumn('doc_date');
                }
                if (Schema::hasColumn('store_materials', 'price_per_unit')) {
                    $table->dropColumn('price_per_unit');
                }
            });
        }
    }
};