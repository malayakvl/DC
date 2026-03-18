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
        DB::statement("DROP FUNCTION IF EXISTS core.get_supplier_ledger_by_clinic(TEXT, BIGINT, BIGINT[], DATE, DATE);");

        $sqlFunction = <<<'SQL'
CREATE OR REPLACE FUNCTION core.get_supplier_ledger_by_clinic(
    p_schema_name TEXT,
    p_supplier_id BIGINT DEFAULT NULL,
    p_store_ids BIGINT[] DEFAULT NULL,
    p_date_from DATE DEFAULT NULL,
    p_date_to DATE DEFAULT NULL
)
RETURNS TABLE(
    supplier_id BIGINT,
    supplier_name VARCHAR,
    row_type TEXT,
    created_at TIMESTAMP,
    document_type VARCHAR,
    document_id BIGINT,
    debit NUMERIC,
    credit NUMERIC,
    running_balance NUMERIC
)
AS
$$
DECLARE
    sql TEXT;
BEGIN

    sql := format($f$

WITH all_movements AS (
    SELECT
        sm.supplier_id,
        sm.created_at,
        sm.document_type,
        sm.document_id,
        CASE WHEN sm.document_type = 'income' THEN sm.total_sum ELSE 0 END AS debit,
        CASE WHEN sm.document_type = 'payment' THEN sm.total_sum ELSE 0 END AS credit,
        CASE 
            WHEN sm.document_type = 'income' THEN sm.total_sum
            WHEN sm.document_type = 'payment' THEN -sm.total_sum
        END AS amount
    FROM %I.supplier_movements sm
    WHERE ($1 IS NULL OR sm.supplier_id = $1)
),

opening_balance AS (
    SELECT
        m.supplier_id,
        COALESCE(SUM(m.amount), 0) AS balance
    FROM all_movements m
    WHERE m.created_at::date < $2
    GROUP BY m.supplier_id
),

period_movements AS (
    SELECT
        m.*,
        SUM(m.amount) OVER (PARTITION BY m.supplier_id ORDER BY m.created_at, m.document_id) as period_running
    FROM all_movements m
    WHERE m.created_at::date >= $2 AND m.created_at::date <= $3
),

closing_balance AS (
    SELECT
        m.supplier_id,
        COALESCE(SUM(m.amount), 0) AS balance
    FROM all_movements m
    WHERE m.created_at::date <= $3
    GROUP BY m.supplier_id
),

suppliers_list AS (
    SELECT id as supplier_id, name as supplier_name FROM %I.suppliers s
    WHERE ($1 IS NULL OR s.id = $1)
    AND (
        EXISTS (SELECT 1 FROM opening_balance ob WHERE ob.supplier_id = s.id AND ob.balance != 0)
        OR EXISTS (SELECT 1 FROM period_movements pm WHERE pm.supplier_id = s.id)
    )
)

SELECT
    sl.supplier_id,
    sl.supplier_name::varchar,
    t.row_type,
    t.created_at,
    t.document_type::varchar,
    t.document_id,
    t.debit,
    t.credit,
    t.running_balance
FROM suppliers_list sl
CROSS JOIN LATERAL (
    -- Opening Balance Row
    SELECT
        'opening_balance'::text as row_type,
        ($2 || ' 00:00:00')::timestamp as created_at,
        NULL::varchar as document_type,
        NULL::bigint as document_id,
        0::numeric as debit,
        0::numeric as credit,
        COALESCE((SELECT ob.balance FROM opening_balance ob WHERE ob.supplier_id = sl.supplier_id), 0) as running_balance
    
    UNION ALL

    -- Movement Rows
    SELECT
        'movement'::text as row_type,
        pm.created_at,
        pm.document_type::varchar,
        pm.document_id,
        pm.debit,
        pm.credit,
        COALESCE((SELECT ob.balance FROM opening_balance ob WHERE ob.supplier_id = sl.supplier_id), 0) + pm.period_running as running_balance
    FROM period_movements pm
    WHERE pm.supplier_id = sl.supplier_id

    UNION ALL

    -- Closing Balance Row
    SELECT
        'closing_balance'::text as row_type,
        ($3 || ' 23:59:59')::timestamp as created_at,
        NULL::varchar as document_type,
        NULL::bigint as document_id,
        0::numeric as debit,
        0::numeric as credit,
        COALESCE((SELECT cb.balance FROM closing_balance cb WHERE cb.supplier_id = sl.supplier_id), 0) as running_balance
    FROM closing_balance cb
    WHERE cb.supplier_id = sl.supplier_id
) t
ORDER BY sl.supplier_name, sl.supplier_id, 
    CASE t.row_type 
        WHEN 'opening_balance' THEN 1 
        WHEN 'movement' THEN 2 
        WHEN 'closing_balance' THEN 3 
    END, 
    t.created_at, t.document_id

$f$, p_schema_name, p_schema_name);

    RETURN QUERY EXECUTE sql
    USING p_supplier_id, p_date_from, p_date_to;

END;
$$ LANGUAGE plpgsql;
SQL;

        DB::statement($sqlFunction);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP FUNCTION IF EXISTS core.get_supplier_ledger_by_clinic(TEXT, BIGINT, BIGINT[], DATE, DATE);");
    }
};
