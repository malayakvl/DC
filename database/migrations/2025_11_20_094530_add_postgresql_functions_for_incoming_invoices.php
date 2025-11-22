<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create function to update or insert store materials
        DB::statement("
            CREATE OR REPLACE FUNCTION update_store_materials(
                p_doc_date TIMESTAMP,
                p_document_type VARCHAR,
                p_document_id BIGINT,
                p_store_id BIGINT,
                p_material_id BIGINT,
                p_qty NUMERIC,
                p_unit_id BIGINT,
                p_fact_qty NUMERIC,
                p_fact_unit_id BIGINT,
                p_price_per_unit NUMERIC,
                p_producer_id BIGINT
            )
            RETURNS VOID AS $$
            DECLARE
                v_existing_id BIGINT;
            BEGIN
                -- Check if record already exists
                SELECT id INTO v_existing_id
                FROM store_materials
                WHERE store_id = p_store_id 
                AND material_id = p_material_id 
                AND producer_id = p_producer_id
                LIMIT 1;
                
                IF v_existing_id IS NOT NULL THEN
                    -- Update existing record
                    UPDATE store_materials
                    SET doc_date = p_doc_date,
                        document_type = p_document_type,
                        document_id = p_document_id,
                        qty = COALESCE(qty, 0) + p_qty,
                        store_qty = COALESCE(store_qty, 0) + p_qty,
                        fact_qty = COALESCE(fact_qty, 0) + p_fact_qty,
                        store_fact_qty = COALESCE(store_fact_qty, 0) + p_fact_qty,
                        price_per_unit = p_price_per_unit,
                        updated_at = NOW()
                    WHERE id = v_existing_id;
                ELSE
                    -- Insert new record
                    INSERT INTO store_materials (
                        doc_date, document_type, document_id, store_id, material_id, 
                        producer_id, qty, store_qty, unit_id, fact_qty, 
                        store_fact_qty, fact_unit_id, price_per_unit, created_at, updated_at
                    ) VALUES (
                        p_doc_date, p_document_type, p_document_id, p_store_id, p_material_id,
                        p_producer_id, p_qty, p_qty, p_unit_id, p_fact_qty,
                        p_fact_qty, p_fact_unit_id, p_price_per_unit, NOW(), NOW()
                    );
                END IF;
            END;
            $$ LANGUAGE plpgsql;
        ");

        // Create function to create document operations
        DB::statement("
            CREATE OR REPLACE FUNCTION create_document_operation(
                p_operation_date TIMESTAMP,
                p_operation_number VARCHAR,
                p_document_id BIGINT,
                p_document_type VARCHAR,
                p_operation_dt VARCHAR,
                p_subconto_dt JSONB,
                p_operation_kt VARCHAR,
                p_subconto_kt JSONB,
                p_amount NUMERIC,
                p_quantity NUMERIC,
                p_comment VARCHAR
            )
            RETURNS VOID AS $$
            BEGIN
                INSERT INTO document_operations (
                    operation_date, operation_number, document_id, document_type,
                    operation_dt, subconto_dt, operation_kt, subconto_kt,
                    amount, quantity, comment, created_at, updated_at
                ) VALUES (
                    p_operation_date, p_operation_number, p_document_id, p_document_type,
                    p_operation_dt, p_subconto_dt, p_operation_kt, p_subconto_kt,
                    p_amount, p_quantity, p_comment, NOW(), NOW()
                );
            END;
            $$ LANGUAGE plpgsql;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the functions
        DB::statement("DROP FUNCTION IF EXISTS update_store_materials(
            TIMESTAMP, VARCHAR, BIGINT, BIGINT, BIGINT, NUMERIC, BIGINT, NUMERIC, BIGINT, NUMERIC, BIGINT
        )");
        
        DB::statement("DROP FUNCTION IF EXISTS create_document_operation(
            TIMESTAMP, VARCHAR, BIGINT, VARCHAR, VARCHAR, JSONB, VARCHAR, JSONB, NUMERIC, NUMERIC, VARCHAR
        )");
    }
};