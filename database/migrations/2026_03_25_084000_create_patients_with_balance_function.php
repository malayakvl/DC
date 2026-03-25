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
        DB::statement("
            CREATE OR REPLACE FUNCTION core.patients_with_balance(
                p_schema text,
                p_filial_id bigint DEFAULT NULL::bigint,
                p_patient_name text DEFAULT NULL,
                p_phone text DEFAULT NULL,
                p_limit int DEFAULT 50,
                p_offset int DEFAULT 0
            )
            RETURNS TABLE(
                patient_id bigint,
                patient_name text,
                filial_id bigint,
                balance numeric,
                primary_phone varchar,
                sum_acts numeric,
                sum_payments numeric
            )
            LANGUAGE plpgsql
            AS \$function$
            BEGIN
                RETURN QUERY EXECUTE format(\$sql\$
                    WITH docs AS (
                        SELECT *
                        FROM core.balance_documents(%L, NULL, %L)
                    ),
                    last_balance AS (
                        SELECT
                            b.patient_id,
                            b.filial_id,
                            MAX(b.running_balance) AS balance
                        FROM docs b
                        GROUP BY b.patient_id, b.filial_id
                    ),
                    phones AS (
                        SELECT patient_id, phone AS primary_phone
                        FROM %I.phones
                        WHERE is_primary = true
                    ),
                    summary AS (
                        SELECT
                            patient_id,
                            SUM(amount) FILTER (WHERE document_type = 'act') AS sum_acts,
                            SUM(amount) FILTER (WHERE document_type = 'payment') AS sum_payments
                        FROM docs
                        GROUP BY patient_id
                    )
                    SELECT
                        pt.id AS patient_id,
                        (u.last_name || ' ' || u.first_name) AS patient_name,
                        COALESCE(lb.filial_id, 0) AS filial_id,
                        COALESCE(lb.balance, 0) AS balance,
                        ph.primary_phone,
                        COALESCE(s.sum_acts, 0) AS sum_acts,
                        COALESCE(s.sum_payments, 0) AS sum_payments
                    FROM %I.patients pt
                    JOIN core.users u ON u.id = pt.user_id
                    LEFT JOIN last_balance lb ON lb.patient_id = pt.id
                    LEFT JOIN phones ph ON ph.patient_id = pt.id
                    LEFT JOIN summary s ON s.patient_id = pt.id
                    WHERE (%L IS NULL OR pt.id IN (
                              SELECT patient_id
                              FROM %I.phones
                              WHERE phone LIKE '%%' || %L || '%%'
                          ))
                      AND (%L IS NULL OR (u.last_name || ' ' || u.first_name) ILIKE '%%' || %L || '%%')
                      AND (%L IS NULL OR lb.filial_id = %L)
                    ORDER BY pt.id
                    LIMIT %s OFFSET %s
                \$sql\$,
                    p_schema,
                    p_filial_id,
                    p_schema,
                    p_schema,
                    p_schema,
                    p_phone,
                    p_schema,
                    p_phone,
                    p_patient_name,
                    p_patient_name,
                    p_filial_id,
                    p_filial_id,
                    p_limit,
                    p_offset
                );
            END;
            \$function$;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP FUNCTION IF EXISTS core.patients_with_balance(text, bigint, text, text, int, int)");
    }
};
