<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared("
            CREATE OR REPLACE FUNCTION core.add_money_movement(p_schema_name text, p_account_id bigint, p_document_type character varying, p_document_id bigint, p_amount numeric, p_direction smallint)
             RETURNS void
             LANGUAGE plpgsql
            AS \$function\$
            BEGIN
                EXECUTE format(
                    'INSERT INTO %I.money_movements
                    (account_id, document_type, document_id, amount, direction, created_at)
                    VALUES (\$1, \$2, \$3, \$4, \$5, NOW())',
                    p_schema_name
                )
                USING p_account_id, p_document_type, p_document_id, p_amount, p_direction;
            END;
            \$function\$
            ;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP FUNCTION IF EXISTS core.add_money_movement(text, bigint, character varying, bigint, numeric, smallint);');
    }
};
