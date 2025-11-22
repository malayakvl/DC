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
        // Create a PostgreSQL function to calculate store material balances
        DB::statement("
            CREATE OR REPLACE FUNCTION calculate_store_balance(
                p_store_id INTEGER DEFAULT NULL,
                p_date_from DATE DEFAULT CURRENT_DATE,
                p_date_to DATE DEFAULT CURRENT_DATE,
                p_material_id INTEGER DEFAULT NULL
            )
            RETURNS TABLE (
                store_id BIGINT,
                store_name VARCHAR(255),
                product_id INTEGER,
                product_name VARCHAR(255),
                beginning_balance_qty NUMERIC,
                beginning_balance_fact_qty NUMERIC,
                incoming_qty NUMERIC,
                incoming_fact_qty NUMERIC,
                outgoing_qty NUMERIC,
                outgoing_fact_qty NUMERIC,
                ending_balance_qty NUMERIC,
                ending_balance_fact_qty NUMERIC,
                movements JSONB
            )
            AS $$
            BEGIN
                RETURN QUERY
                WITH store_filter AS (
                    -- Get the list of stores to process
                    SELECT id, name
                    FROM stores
                    WHERE (p_store_id IS NULL OR id = p_store_id)
                ),
                beginning_balances AS (
                    -- Calculate beginning balances (end of previous day)
                    SELECT 
                        sf.id as store_id,
                        sf.name::VARCHAR(255) as store_name,
                        COALESCE(sub_dt.product_id::INTEGER, sub_kt.product_id::INTEGER) as product_id,
                        COALESCE(sub_dt.product_name, sub_kt.product_name)::VARCHAR(255) as product_name,
                        COALESCE(SUM(sub_dt.fact_qty::NUMERIC), 0) - COALESCE(SUM(sub_kt.fact_qty::NUMERIC), 0) as beginning_balance_fact_qty,
                        COALESCE(SUM(sub_dt.qty::NUMERIC), 0) - COALESCE(SUM(sub_kt.qty::NUMERIC), 0) as beginning_balance_qty
                    FROM store_filter sf
                    LEFT JOIN document_operations doc ON (
                        (subconto_dt->>'store_id')::INTEGER = sf.id OR 
                        (subconto_kt->>'store_id')::INTEGER = sf.id
                    )
                    LEFT JOIN LATERAL (
                        SELECT 
                            (subconto_dt->>'product_id')::INTEGER as product_id,
                            subconto_dt->>'product_name' as product_name,
                            (subconto_dt->>'fact_qty')::NUMERIC as fact_qty,
                            COALESCE((subconto_dt->>'qty')::NUMERIC, (subconto_dt->>'fact_qty')::NUMERIC) as qty
                        WHERE doc.subconto_dt IS NOT NULL 
                        AND doc.subconto_dt->>'store_id' IS NOT NULL
                        AND (subconto_dt->>'store_id')::INTEGER = sf.id
                    ) sub_dt ON TRUE
                    LEFT JOIN LATERAL (
                        SELECT 
                            (subconto_kt->>'product_id')::INTEGER as product_id,
                            subconto_kt->>'product_name' as product_name,
                            (subconto_kt->>'fact_qty')::NUMERIC as fact_qty,
                            COALESCE((subconto_kt->>'qty')::NUMERIC, (subconto_kt->>'fact_qty')::NUMERIC) as qty
                        WHERE doc.subconto_kt IS NOT NULL 
                        AND doc.subconto_kt->>'store_id' IS NOT NULL
                        AND (subconto_kt->>'store_id')::INTEGER = sf.id
                    ) sub_kt ON TRUE
                    WHERE doc.operation_date::DATE <= (p_date_from - INTERVAL '1 day')::DATE
                    AND (p_material_id IS NULL OR 
                         (sub_dt.product_id = p_material_id OR sub_kt.product_id = p_material_id))
                    AND (operation_dt = '281' OR operation_kt = '281')
                    GROUP BY sf.id, sf.name, sub_dt.product_id, sub_kt.product_id, sub_dt.product_name, sub_kt.product_name
                ),
                period_movements AS (
                    -- Get movements during the period
                    SELECT 
                        sf.id as store_id,
                        sf.name::VARCHAR(255) as store_name,
                        COALESCE(sub_dt.product_id::INTEGER, sub_kt.product_id::INTEGER) as product_id,
                        COALESCE(sub_dt.product_name, sub_kt.product_name)::VARCHAR(255) as product_name,
                        COALESCE(SUM(CASE WHEN sub_dt.fact_qty IS NOT NULL THEN sub_dt.fact_qty ELSE 0 END), 0) as incoming_fact_qty,
                        COALESCE(SUM(CASE WHEN sub_dt.qty IS NOT NULL THEN sub_dt.qty ELSE 0 END), 0) as incoming_qty,
                        COALESCE(SUM(CASE WHEN sub_kt.fact_qty IS NOT NULL THEN sub_kt.fact_qty ELSE 0 END), 0) as outgoing_fact_qty,
                        COALESCE(SUM(CASE WHEN sub_kt.qty IS NOT NULL THEN sub_kt.qty ELSE 0 END), 0) as outgoing_qty,
                        jsonb_agg(
                            jsonb_build_object(
                                'operation_date', doc.operation_date,
                                'document_type', doc.document_type,
                                'document_id', doc.document_id,
                                'operation_number', doc.operation_number,
                                'incoming_fact_qty', CASE WHEN sub_dt.fact_qty IS NOT NULL THEN sub_dt.fact_qty ELSE 0 END,
                                'incoming_qty', CASE WHEN sub_dt.qty IS NOT NULL THEN sub_dt.qty ELSE 0 END,
                                'outgoing_fact_qty', CASE WHEN sub_kt.fact_qty IS NOT NULL THEN sub_kt.fact_qty ELSE 0 END,
                                'outgoing_qty', CASE WHEN sub_kt.qty IS NOT NULL THEN sub_kt.qty ELSE 0 END,
                                'comment', doc.comment
                            )
                            ORDER BY doc.operation_date
                        ) FILTER (WHERE doc.id IS NOT NULL) as movements
                    FROM store_filter sf
                    LEFT JOIN document_operations doc ON (
                        (subconto_dt->>'store_id')::INTEGER = sf.id OR 
                        (subconto_kt->>'store_id')::INTEGER = sf.id
                    )
                    LEFT JOIN LATERAL (
                        SELECT 
                            (subconto_dt->>'product_id')::INTEGER as product_id,
                            subconto_dt->>'product_name' as product_name,
                            (subconto_dt->>'fact_qty')::NUMERIC as fact_qty,
                            COALESCE((subconto_dt->>'qty')::NUMERIC, (subconto_dt->>'fact_qty')::NUMERIC) as qty
                        WHERE doc.subconto_dt IS NOT NULL 
                        AND doc.subconto_dt->>'store_id' IS NOT NULL
                        AND (subconto_dt->>'store_id')::INTEGER = sf.id
                    ) sub_dt ON TRUE
                    LEFT JOIN LATERAL (
                        SELECT 
                            (subconto_kt->>'product_id')::INTEGER as product_id,
                            subconto_kt->>'product_name' as product_name,
                            (subconto_kt->>'fact_qty')::NUMERIC as fact_qty,
                            COALESCE((subconto_kt->>'qty')::NUMERIC, (subconto_kt->>'fact_qty')::NUMERIC) as qty
                        WHERE doc.subconto_kt IS NOT NULL 
                        AND doc.subconto_kt->>'store_id' IS NOT NULL
                        AND (subconto_kt->>'store_id')::INTEGER = sf.id
                    ) sub_kt ON TRUE
                    WHERE doc.operation_date::DATE BETWEEN p_date_from AND p_date_to
                    AND (p_material_id IS NULL OR 
                         (sub_dt.product_id = p_material_id OR sub_kt.product_id = p_material_id))
                    AND (operation_dt = '281' OR operation_kt = '281')
                    GROUP BY sf.id, sf.name, sub_dt.product_id, sub_kt.product_id, sub_dt.product_name, sub_kt.product_name
                )
                SELECT 
                    COALESCE(bb.store_id, pm.store_id) as store_id,
                    COALESCE(bb.store_name, pm.store_name) as store_name,
                    COALESCE(bb.product_id, pm.product_id) as product_id,
                    COALESCE(bb.product_name, pm.product_name) as product_name,
                    COALESCE(bb.beginning_balance_qty, 0) as beginning_balance_qty,
                    COALESCE(bb.beginning_balance_fact_qty, 0) as beginning_balance_fact_qty,
                    COALESCE(pm.incoming_qty, 0) as incoming_qty,
                    COALESCE(pm.incoming_fact_qty, 0) as incoming_fact_qty,
                    COALESCE(pm.outgoing_qty, 0) as outgoing_qty,
                    COALESCE(pm.outgoing_fact_qty, 0) as outgoing_fact_qty,
                    (COALESCE(bb.beginning_balance_qty, 0) + COALESCE(pm.incoming_qty, 0) - COALESCE(pm.outgoing_qty, 0)) as ending_balance_qty,
                    (COALESCE(bb.beginning_balance_fact_qty, 0) + COALESCE(pm.incoming_fact_qty, 0) - COALESCE(pm.outgoing_fact_qty, 0)) as ending_balance_fact_qty,
                    COALESCE(pm.movements, '[]'::JSONB) as movements
                FROM beginning_balances bb
                FULL OUTER JOIN period_movements pm ON (
                    bb.store_id = pm.store_id AND 
                    bb.product_id = pm.product_id
                )
                WHERE bb.store_id IS NOT NULL OR pm.store_id IS NOT NULL;
            END;
            $$ LANGUAGE plpgsql;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP FUNCTION IF EXISTS calculate_store_balance(INTEGER, DATE, DATE, INTEGER);");
    }
};