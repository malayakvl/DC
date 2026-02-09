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
            CREATE OR REPLACE FUNCTION core.apply_store_movement(
                p_schema text, 
                p_store_id bigint, 
                p_material_id bigint, 
                p_batch_id bigint, 
                p_direction integer, 
                p_qty numeric, 
                p_fact_qty numeric, 
                p_document_type text, 
                p_document_id bigint, 
                p_item_id bigint, 
                p_price_per_unit numeric, 
                p_allow_negative boolean DEFAULT false
            )
            RETURNS bigint
            LANGUAGE plpgsql
            AS \$\$
            DECLARE
                v_delta numeric;
                v_movement_id bigint;
            BEGIN
                IF p_direction NOT IN (1,-1) THEN
                    RAISE EXCEPTION 'direction must be 1 or -1';
                END IF;

                v_delta := p_qty * p_direction;

                -------------------------------------------------
                -- batch
                -------------------------------------------------
                EXECUTE format(
                    'UPDATE %I.store_batches
                     SET qty_left = qty_left + $1,
                         fact_qty_left = fact_qty_left + $2,
                         updated_at = now()
                     WHERE id = $3',
                    p_schema
                )
                USING v_delta, p_fact_qty * p_direction, p_batch_id;

                -------------------------------------------------
                -- balance (UPSERT быстрее и чище)
                -------------------------------------------------
                EXECUTE format(
                    'INSERT INTO %I.store_balances
                        (store_id, material_id, qty, fact_qty, created_at, updated_at)
                     VALUES ($1,$2,$3,$4,now(),now())
                     ON CONFLICT (store_id, material_id)
                     DO UPDATE SET
                        qty = %I.store_balances.qty + $3,
                        fact_qty = %I.store_balances.fact_qty + $4,
                        updated_at = now()',
                    p_schema, p_schema, p_schema
                )
                USING p_store_id, p_material_id, v_delta, p_fact_qty * p_direction;

                -------------------------------------------------
                -- movement log
                -------------------------------------------------
                EXECUTE format(
                    'INSERT INTO %I.store_movements
                    (store_id, material_id, batch_id, direction, qty, fact_qty,
                     document_type, document_id, act_item_id, price_per_unit, created_at, updated_at)
                     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,now(),now())
                     RETURNING id',
                    p_schema
                )
                INTO v_movement_id
                USING
                    p_store_id,
                    p_material_id,
                    p_batch_id,
                    p_direction,
                    p_qty,
                    p_fact_qty,
                    p_document_type,
                    p_document_id,
                    p_item_id,
                    p_price_per_unit;

                RETURN v_movement_id;
            END;
            \$\$;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP FUNCTION IF EXISTS core.apply_store_movement(text, bigint, bigint, bigint, integer, numeric, numeric, text, bigint, bigint, numeric, boolean)");
    }
};
