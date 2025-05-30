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
        Schema::table('materials', function($table) {
            $table->foreignId('size_id')->nullable()->index();
            $table->foreignId('producer_id')->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('materials', function($table) {
            $table->dropColumn('size_id');
            $table->dropColumn('producer_id');

        });
    }
};
