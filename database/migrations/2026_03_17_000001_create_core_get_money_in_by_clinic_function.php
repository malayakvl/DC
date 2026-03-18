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
            CREATE OR REPLACE FUNCTION core.get_money_in_by_clinic(p_schema_name text, p_payment_method_id bigint DEFAULT NULL::bigint, p_date_from date DEFAULT NULL::date, p_date_to date DEFAULT NULL::date, p_limit integer DEFAULT 50, p_offset integer DEFAULT 0)
             RETURNS TABLE(id bigint, document_number character varying, document_date date, payment_method_id bigint, payment_method_name character varying, amount numeric, currency_id bigint, currency_name character varying, created_by character varying, comment text, status character varying)
             LANGUAGE plpgsql
            AS \$function\$
            DECLARE
                sql TEXT;
            BEGIN
            
                sql := format(\$f\$
                    SELECT
                        m.id,
                        m.document_number,
                        m.document_date,
                        m.account_id,
                        pm.name AS payment_method_name,
                        m.amount,
                        m.currency_id,
                        c.name AS currency_name,
                        u.name AS created_by,
                        m.comment,
                        m.status
                    FROM %I.money_in m
                    LEFT JOIN %I.payment_methods pm ON pm.id = m.account_id
                    LEFT JOIN %I.currencies c ON c.id = m.currency_id
                    LEFT JOIN core.users u ON u.id = m.customer_id
                    WHERE
                        (\$1 IS NULL OR m.account_id = \$1)
                        AND (\$2 IS NULL OR m.document_date >= \$2)
                        AND (\$3 IS NULL OR m.document_date <= \$3)
                    ORDER BY m.document_date DESC, m.id DESC
                    LIMIT \$4
                    OFFSET \$5
                \$f\$, p_schema_name, p_schema_name, p_schema_name);
            
                RETURN QUERY EXECUTE sql
                USING p_payment_method_id, p_date_from, p_date_to, p_limit, p_offset;
            
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
        DB::unprepared('DROP FUNCTION IF EXISTS core.get_money_in_by_clinic(text, bigint, date, date, integer, integer);');
    }
};
