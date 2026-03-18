<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("DROP FUNCTION IF EXISTS core.get_store_movements_by_material;");
        
        $sqlFunction = <<<'SQL'
CREATE OR REPLACE FUNCTION core.get_store_movements_by_material(
    p_schema text,
    p_store_id bigint,
    p_date_from timestamp,
    p_date_to timestamp
)
RETURNS TABLE(
    material_id bigint,
    material_name text,
    row_type text,
    created_at timestamp,
    document_type text,
    document_id bigint,
    qty numeric,
    running_balance numeric
)
LANGUAGE plpgsql
AS $$
DECLARE
    sql text;
BEGIN

sql := format($f$

WITH movements AS (
    SELECT
        mv.material_id,
        mv.document_type,
        mv.document_id,
        mv.created_at,
        mv.movement_qty * mv.direction AS qty
    FROM %I.store_movements_report mv
    WHERE mv.store_id = $1
),

opening_balance AS (
    SELECT
        material_id,
        COALESCE(SUM(qty),0) AS qty
    FROM movements
    WHERE created_at < $2
    GROUP BY material_id
),

period_movements AS (
    SELECT *
    FROM movements
    WHERE created_at >= $2
      AND created_at < $3
),

running_movements AS (
    SELECT
        pm.material_id,
        pm.document_type,
        pm.document_id,
        pm.created_at,
        pm.qty,
        COALESCE(ob.qty,0) +
        SUM(pm.qty) OVER (
            PARTITION BY pm.material_id
            ORDER BY pm.created_at, pm.document_id
            ROWS UNBOUNDED PRECEDING
        ) AS running_balance
    FROM period_movements pm
    LEFT JOIN opening_balance ob ON ob.material_id = pm.material_id
),

closing_balance AS (
    SELECT
        material_id,
        COALESCE(SUM(qty),0) AS qty
    FROM movements
    WHERE created_at < $3
    GROUP BY material_id
),

materials AS (
    SELECT material_id FROM opening_balance
    UNION
    SELECT material_id FROM closing_balance
    UNION
    SELECT material_id FROM period_movements
)

SELECT
    t.material_id,
    mat.name::text AS material_name,
    t.row_type,
    t.created_at,
    t.document_type,
    t.document_id,
    t.qty,
    t.running_balance
FROM (

    -- opening balance
    SELECT
        m.material_id,
        'opening_balance'::text AS row_type,
        NULL::timestamp AS created_at,
        NULL::text AS document_type,
        NULL::bigint AS document_id,
        COALESCE(ob.qty,0) AS qty,
        COALESCE(ob.qty,0) AS running_balance
    FROM materials m
    LEFT JOIN opening_balance ob ON ob.material_id = m.material_id

    UNION ALL

    -- movements
    SELECT
        rm.material_id,
        'movement'::text AS row_type,
        rm.created_at,
        rm.document_type,
        rm.document_id,
        rm.qty,
        rm.running_balance
    FROM running_movements rm

    UNION ALL

    -- closing balance (только если были движения)
    SELECT
        cb.material_id,
        'closing_balance'::text AS row_type,
        NULL::timestamp AS created_at,
        NULL::text AS document_type,
        NULL::bigint AS document_id,
        cb.qty AS qty,
        cb.qty AS running_balance
    FROM closing_balance cb
    WHERE EXISTS (
        SELECT 1
        FROM period_movements pm
        WHERE pm.material_id = cb.material_id
    )

) t
JOIN %I.materials mat ON mat.id = t.material_id

ORDER BY
    t.material_id,
    CASE t.row_type
        WHEN 'opening_balance' THEN 0
        WHEN 'movement' THEN 1
        WHEN 'closing_balance' THEN 2
    END,
    t.created_at,
    t.document_id

$f$, p_schema, p_schema);

RETURN QUERY EXECUTE sql USING p_store_id, p_date_from, p_date_to;

END;
$$;
SQL;

        DB::statement($sqlFunction);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP FUNCTION IF EXISTS core.get_store_movements_by_material;");
    }
};
