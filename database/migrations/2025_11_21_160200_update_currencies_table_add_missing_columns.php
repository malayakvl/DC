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
        Schema::table('currencies', function (Blueprint $table) {
            // Add missing columns if they don't exist
            if (!Schema::hasColumn('currencies', 'code')) {
                $table->string('code')->nullable();
            }
            if (!Schema::hasColumn('currencies', 'symbol')) {
                $table->string('symbol')->nullable();
            }
            if (!Schema::hasColumn('currencies', 'rate')) {
                $table->decimal('rate', 10, 4)->nullable();
            }
            if (!Schema::hasColumn('currencies', 'created_at')) {
                $table->timestamp('created_at')->nullable();
            }
            if (!Schema::hasColumn('currencies', 'updated_at')) {
                $table->timestamp('updated_at')->nullable();
            }
        });

        Schema::table('currency_exchange', function (Blueprint $table) {
            // Add missing timestamps if they don't exist
            if (!Schema::hasColumn('currency_exchange', 'created_at')) {
                $table->timestamp('created_at')->nullable();
            }
            if (!Schema::hasColumn('currency_exchange', 'updated_at')) {
                $table->timestamp('updated_at')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('currencies', function (Blueprint $table) {
            if (Schema::hasColumn('currencies', 'code')) {
                $table->dropColumn('code');
            }
            if (Schema::hasColumn('currencies', 'symbol')) {
                $table->dropColumn('symbol');
            }
            if (Schema::hasColumn('currencies', 'rate')) {
                $table->dropColumn('rate');
            }
            if (Schema::hasColumn('currencies', 'created_at')) {
                $table->dropColumn('created_at');
            }
            if (Schema::hasColumn('currencies', 'updated_at')) {
                $table->dropColumn('updated_at');
            }
        });

        Schema::table('currency_exchange', function (Blueprint $table) {
            if (Schema::hasColumn('currency_exchange', 'created_at')) {
                $table->dropColumn('created_at');
            }
            if (Schema::hasColumn('currency_exchange', 'updated_at')) {
                $table->dropColumn('updated_at');
            }
        });
    }
};