<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $sql = "
        CREATE OR REPLACE FUNCTION core.patients_with_balance(
            p_schema text,
            p_filial_id text DEFAULT NULL,
            p_patient_name text DEFAULT NULL,
            p_phone text DEFAULT NULL,
            p_limit text DEFAULT '50',
            p_offset text DEFAULT '0'
        ) 
        RETURNS TABLE (
            patient_id bigint, 
            patient_name text, 
            filial_id bigint, 
            balance numeric, 
            primary_phone text, 
            sum_acts numeric, 
            sum_payments numeric
        ) AS $$
        DECLARE
            v_sql text;
        BEGIN
            v_sql := 'WITH patient_data AS (
                SELECT 
                    p.id as patient_id,
                    u.name::text as patient_name,
                    ' || quote_nullable(p_filial_id) || '::bigint as filial_id,
                    (SELECT phone FROM ' || quote_ident(p_schema) || '.phones WHERE patient_id = p.id LIMIT 1)::text as primary_phone,
                    COALESCE((SELECT sum(total_amount) FROM ' || quote_ident(p_schema) || '.acts WHERE patient_id = p.id), 0) as sum_acts,
                    COALESCE((SELECT sum(amount) FROM ' || quote_ident(p_schema) || '.payments WHERE patient_id = p.id), 0) as sum_payments
                FROM ' || quote_ident(p_schema) || '.patients p
                JOIN core.users u ON u.id = p.user_id
                WHERE (' || quote_nullable(p_patient_name) || ' IS NULL OR u.name ILIKE ''%'' || ' || quote_nullable(p_patient_name) || ' || ''%'')
                  AND (' || quote_nullable(p_phone) || ' IS NULL OR p.id IN (SELECT pt.patient_id FROM ' || quote_ident(p_schema) || '.phones pt WHERE pt.phone LIKE ''%'' || ' || quote_nullable(p_phone) || ' || ''%''))
            )
            SELECT 
                patient_id, 
                patient_name, 
                filial_id, 
                (sum_payments - sum_acts) as balance, 
                primary_phone, 
                sum_acts, 
                sum_payments
            FROM patient_data
            LIMIT ' || quote_nullable(p_limit) || '::integer 
            OFFSET ' || quote_nullable(p_offset) || '::integer';
            
            RETURN QUERY EXECUTE v_sql;
        END;
        $$ LANGUAGE plpgsql;
        ";

        DB::statement($sql);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP FUNCTION IF EXISTS core.patients_with_balance(text,text,text,text,text,text)");
    }
};
