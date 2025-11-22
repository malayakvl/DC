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
        // Drop redundant tables from public schema
        // These tables should only exist in clinic-specific schemas
        Schema::dropIfExists('unit');
        Schema::dropIfExists('size');
        Schema::dropIfExists('vat_rates');
        Schema::dropIfExists('store_materials');
        Schema::dropIfExists('stores');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Note: We cannot recreate the exact original tables in the down migration
        // because we don't have their original structure here.
        // If you need to rollback, you should run the original migrations again.
    }
};