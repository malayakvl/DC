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
        // Сначала удаляем старую версию с 5 параметрами, чтобы не было конфликтов имен
        DB::statement("DROP FUNCTION IF EXISTS core.get_income_invoices_by_clinic(text, bigint[], bigint, date, date)");

        DB::statement("
            CREATE OR REPLACE FUNCTION core.get_income_invoices_by_clinic(
                p_schema_name TEXT,
                p_store_ids BIGINT[] DEFAULT NULL,
                p_supplier_id BIGINT DEFAULT NULL,
                p_date_from DATE DEFAULT NULL,
                p_date_to DATE DEFAULT NULL,
                p_limit INT DEFAULT 50,
                p_offset INT DEFAULT 0
            )
            RETURNS TABLE(
                invoice_id BIGINT,
                invoice_number VARCHAR,
                invoice_date TIMESTAMP,
                store_id BIGINT,
                store_name VARCHAR,
                supplier_id BIGINT,
                supplier_name VARCHAR,
                customer_id BIGINT,
                customer_name VARCHAR,
                total_amount NUMERIC,
                paid_amount NUMERIC,
                debt_amount NUMERIC,
                payment_status VARCHAR,
                document_status VARCHAR
            ) AS
            \$function\$
            DECLARE
                sql TEXT;
            BEGIN
                sql := format(\$f\$
                    SELECT
                        i.id AS invoice_id,
                        i.invoice_number,
                        i.invoice_date,
                        i.store_id,
                        s.name AS store_name,
                        i.supplier_id,
                        sup.name AS supplier_name,
                        i.customer_id,
                        u.name AS customer_name,
                        i.total_amount,

                        COALESCE(SUM(
                            CASE WHEN sm.document_type='payment'
                            THEN sm.total_sum END
                        ),0) AS paid_amount,

                        i.total_amount -
                        COALESCE(SUM(
                            CASE WHEN sm.document_type='payment'
                            THEN sm.total_sum END
                        ),0) AS debt_amount,

                        CASE
                            WHEN COALESCE(SUM(
                                CASE WHEN sm.document_type='payment'
                                THEN sm.total_sum END
                            ),0) = 0 THEN 'unpaid'::varchar

                            WHEN COALESCE(SUM(
                                CASE WHEN sm.document_type='payment'
                                THEN sm.total_sum END
                            ),0) < i.total_amount THEN 'partial'::varchar

                            ELSE 'paid'::varchar
                        END AS payment_status,

                        i.status::varchar AS document_status

                    FROM %I.invoices i

                    LEFT JOIN %I.stores s
                        ON s.id = i.store_id

                    LEFT JOIN %I.suppliers sup
                        ON sup.id = i.supplier_id

                    LEFT JOIN core.users u
                        ON u.id = i.customer_id

                    LEFT JOIN %I.supplier_movements sm
                        ON sm.document_id = i.id

                    WHERE i.type = 'income'
                      AND (\$1 IS NULL OR i.store_id = ANY(\$1))
                      AND (\$2 IS NULL OR i.supplier_id = \$2)
                      AND (\$3 IS NULL OR i.invoice_date::date >= \$3)
                      AND (\$4 IS NULL OR i.invoice_date::date <= \$4)

                    GROUP BY
                        i.id,
                        s.name,
                        sup.name,
                        u.name

                    ORDER BY i.invoice_number DESC
                    LIMIT \$5
                    OFFSET \$6

                \$f\$,
                    p_schema_name,
                    p_schema_name,
                    p_schema_name,
                    p_schema_name
                );

                RETURN QUERY EXECUTE sql
                USING p_store_ids, p_supplier_id, p_date_from, p_date_to, p_limit, p_offset;
            END;
            \$function\$ LANGUAGE plpgsql;
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP FUNCTION IF EXISTS core.get_income_invoices_by_clinic(TEXT, BIGINT[], BIGINT, DATE, DATE, INT, INT)");
    }
};
