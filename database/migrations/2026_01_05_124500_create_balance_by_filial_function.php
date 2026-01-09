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
            CREATE OR REPLACE FUNCTION core.balance_by_filial(
                p_schema     TEXT,
                p_patient_id BIGINT DEFAULT NULL,
                p_date_from  DATE   DEFAULT NULL,
                p_date_to    DATE   DEFAULT NULL
            )
            RETURNS TABLE (
                filial_id BIGINT,
                charged   NUMERIC,
                paid      NUMERIC,
                balance   NUMERIC
            )
            LANGUAGE plpgsql
            STABLE
            AS \$\$
            DECLARE
                sql TEXT;
            BEGIN
                sql := format(\$f\$
                    SELECT
                        a.filial_id,
                        COALESCE(SUM(a.total_amount), 0) AS charged,
                        COALESCE(SUM(p.amount), 0)       AS paid,
                        COALESCE(SUM(a.total_amount), 0)
                          - COALESCE(SUM(p.amount), 0)   AS balance
                    FROM %I.acts a
                    LEFT JOIN %I.payments p
                        ON p.patient_id = a.patient_id
                       AND (p.act_id = a.id OR p.act_id IS NULL)
                    WHERE
                        (\$1 IS NULL OR a.patient_id = \$1)
                    AND (\$2 IS NULL OR a.act_date >= \$2)
                    AND (\$3 IS NULL OR a.act_date <= \$3)
                    GROUP BY a.filial_id
                    ORDER BY a.filial_id
                \$f\$, p_schema, p_schema);

                RETURN QUERY EXECUTE sql
                    USING p_patient_id, p_date_from, p_date_to;
            END;
            \$\$;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP FUNCTION IF EXISTS core.balance_by_filial(TEXT, BIGINT, DATE, DATE)");
    }
};
