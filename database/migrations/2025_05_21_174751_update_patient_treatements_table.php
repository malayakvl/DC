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
        Schema::table('patient_treatments', function (Blueprint $table) {
            $table->string('formula_type')->default('adult');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
         Schema::table('patient_treatments', function (Blueprint $table) {
            $table->dropColumn('formula_type');
        });
    }
};
