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
        Schema::table('material_categories', function($table) {
            $table->foreignId('producer_id')->nullable();
            $table->foreignId('category_id')->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('material_categories', function($table) {
            $table->dropColumn('producer_id');
            $table->dropColumn('category_id');
        });
    }
};
