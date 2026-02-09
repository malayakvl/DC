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
            CREATE OR REPLACE FUNCTION core.get_store_1c_report(
                p_schema text, 
                p_store_id bigint DEFAULT NULL, 
                p_start_date timestamp without time zone DEFAULT NULL, 
                p_end_date timestamp without time zone DEFAULT NULL
            )
            RETURNS TABLE(
                movement_id bigint, 
                document_type character varying, 
                document_id bigint, 
                store_id bigint, 
                supplier_id bigint, 
                material_id bigint, 
                material_name character varying, 
                qty numeric, 
                fact_qty numeric, 
                price_per_unit numeric, 
                batch_date timestamp without time zone, 
                movement_date timestamp without time zone
            )
            LANGUAGE plpgsql
            AS \$\$
            BEGIN
                RETURN QUERY EXECUTE format(
                    'SELECT
                        sm.id AS movement_id,
                        sm.document_type,
                        sm.document_id,
                        sm.store_id,
                        sb.supplier_id,
                        sm.material_id,
                        m.name AS material_name,
                        sm.qty,
                        sm.fact_qty,
                        sm.price_per_unit,
                        sb.arrived_at::timestamp AS batch_date,
                        sm.created_at AS movement_date
                    FROM %I.store_movements sm
                    JOIN %I.store_batches sb ON sb.id = sm.batch_id
                    JOIN %I.materials m ON m.id = sm.material_id
                    WHERE 1=1
                        %s
                        %s
                        %s
                    ORDER BY sm.created_at',
                    p_schema,
                    p_schema,
                    p_schema,
                    CASE WHEN p_store_id IS NOT NULL THEN ' AND sm.store_id = ' || p_store_id ELSE '' END,
                    CASE WHEN p_start_date IS NOT NULL THEN ' AND sm.created_at >= ' || quote_literal(p_start_date) ELSE '' END,
                    CASE WHEN p_end_date IS NOT NULL THEN ' AND sm.created_at <= ' || quote_literal(p_end_date) ELSE '' END
                );
            END;
            \$\$ ;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP FUNCTION IF EXISTS core.get_store_1c_report(text, bigint, timestamp without time zone, timestamp without time zone)");
    }
};
