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
        DB::unprepared("
CREATE OR REPLACE FUNCTION core.balance_documents(
    p_schema text,
    p_patient_id bigint DEFAULT NULL,
    p_filial_id bigint DEFAULT NULL
)
RETURNS TABLE (
    document_type text,
    document_id bigint,
    document_number text,
    document_date date,
    patient_id bigint,
    patient_name text,
    filial_id bigint,
    amount numeric,
    direction text,
    running_balance numeric
)
LANGUAGE plpgsql
AS \$function\$
BEGIN
    RETURN QUERY EXECUTE format(\$sql\$
        WITH all_docs AS (

            /* ======================
               АКТЫ (debit)
               ====================== */
            SELECT
                'act'::text                     AS document_type,
                a.id                            AS document_id,
                a.act_number::text              AS document_number,
                a.act_date::date                AS document_date,
                a.patient_id,
                (u.last_name || ' ' || u.first_name)::text
                                                AS patient_name,
                a.filial_id,
                a.total_amount                  AS amount,
                'debit'::text                   AS direction
            FROM %I.acts a
            JOIN %I.patients pt ON pt.id = a.patient_id
            JOIN core.users u   ON u.id = pt.user_id
            WHERE (%L IS NULL OR a.patient_id = %L)
              AND (%L IS NULL OR a.filial_id  = %L)

            UNION ALL

            /* ======================
               ПЛАТЕЖИ (credit)
               ====================== */
            SELECT
                'payment'::text                 AS document_type,
                p.id                            AS document_id,
                p.payment_number::text          AS document_number,
                p.payment_date::date            AS document_date,
                p.patient_id,
                (u.last_name || ' ' || u.first_name)::text
                                                AS patient_name,
                p.filial_id,
                p.amount                        AS amount,
                'credit'::text                  AS direction
            FROM %I.payments p
            JOIN %I.patients pt ON pt.id = p.patient_id
            JOIN core.users u   ON u.id = pt.user_id
            WHERE (%L IS NULL OR p.patient_id = %L)
              AND (%L IS NULL OR p.filial_id  = %L)
        )

        SELECT
            document_type,
            document_id,
            document_number,
            document_date,
            patient_id,
            patient_name,
            filial_id,
            amount,
            direction,

            /* ======================
               RUNNING BALANCE
               ====================== */
            SUM(
                CASE
                    WHEN direction = 'credit' THEN amount
                    ELSE -amount
                END
            ) OVER (
                PARTITION BY patient_id
                ORDER BY
                    document_date,
                    CASE direction
                        WHEN 'debit'  THEN 1
                        WHEN 'credit' THEN 2
                    END,
                    document_id
                ROWS UNBOUNDED PRECEDING
            ) AS running_balance

        FROM all_docs

        ORDER BY
            patient_id,
            document_date,
            CASE direction
                WHEN 'debit'  THEN 1
                WHEN 'credit' THEN 2
            END,
            document_id
    \$sql\$,
        /* acts */
        p_schema, p_schema,
        p_patient_id, p_patient_id,
        p_filial_id,  p_filial_id,
        /* payments */
        p_schema, p_schema,
        p_patient_id, p_patient_id,
        p_filial_id,  p_filial_id
    );
END;
\$function\$;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP FUNCTION IF EXISTS core.balance_documents(text, bigint, bigint)");
    }
};
