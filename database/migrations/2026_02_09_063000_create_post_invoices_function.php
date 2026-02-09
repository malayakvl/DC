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
            CREATE OR REPLACE FUNCTION core.post_invoices(p_schema text, p_invoice_id bigint)
            RETURNS void
            LANGUAGE plpgsql
            AS \$\$
            DECLARE
                r record;
                v_batch_id bigint;
            BEGIN
                FOR r IN
                    EXECUTE format(
                        'SELECT ii.id,
                                ii.material_id,
                                ii.qty,
                                ii.fact_qty,
                                ii.price_per_unit,
                                i.store_id,
                                i.invoice_date
                         FROM %I.invoice_items ii
                         JOIN %I.invoices i ON i.id = ii.invoice_id
                         WHERE ii.invoice_id = $1',
                        p_schema, p_schema
                    )
                    USING p_invoice_id
                LOOP

                    -------------------------------------------------
                    -- 1. создаем batch
                    -------------------------------------------------
                    EXECUTE format(
                        'INSERT INTO %I.store_batches
                         (store_id, material_id, invoice_id, arrived_at,
                          qty, qty_left, fact_qty, fact_qty_left,
                          price_per_unit, source_type, source_id, source_item_id)
                         VALUES ($1,$2,$3,$4,$5,$5,$6,$6,$7,''balance'',$3,$8)
                         RETURNING id',
                        p_schema
                    )
                    INTO v_batch_id
                    USING
                        r.store_id,
                        r.material_id,
                        p_invoice_id,
                        r.invoice_date,
                        r.qty,
                        r.fact_qty,
                        r.price_per_unit,
                        r.id;

                    -------------------------------------------------
                    -- 2. движение
                    -------------------------------------------------
                    PERFORM core.apply_store_movement(
                        p_schema,
                        r.store_id,
                        r.material_id,
                        v_batch_id,
                        1,
                        r.qty,
                        r.fact_qty,
                        'balance',
                        p_invoice_id,
                        r.id,
                        r.price_per_unit
                    );

                END LOOP;
            END;
            \$\$ ;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP FUNCTION IF EXISTS core.post_invoices(text, bigint)");
    }
};
