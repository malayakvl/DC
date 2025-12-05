<?php

namespace App\Services;

use App\Constants\Permissions;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;

class ClinicSchemaService
{
    protected array $defaultPermissions = Permissions::DEFAULT_PERMISSIONS;

    /**
     * Create a new schema for the clinic and initialize all required tables
     *
     * @param int $clinicId
     * @return void
     */
    public function createClinicSchema(int $clinicId): void
    {
        $schemaName = 'clinic_' . $clinicId;
        
        // Create the new schema
        DB::statement("CREATE SCHEMA IF NOT EXISTS {$schemaName}");
        
        // Set search path to the new schema
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        DB::statement("SET search_path TO {$schemaName}");
        
        try {
            // Create required tables in the new schema
            $this->createClinicTables();

            // Create default documents
            $this->createDefaultDocuments();
            
            // Create default roles
            $this->createDefaultRoles();
            
            // Create default permissions
            $this->createDefaultPermissions();
            
            // Create default currencies and exchange rates
            $this->createDefaultCurrencies($clinicId);

            // Create default store
            $this->createDefaultStore($clinicId);

            // Create default patient statuses
            $this->createDefaultPatientStatuses($clinicId);
        } finally {
            // Restore original search path
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }
    
    /**
     * Create all required tables for a new clinic schema
     *
     * @return void
     */
    protected function createClinicTables(): void
    {
        // Create clinic_filials table
        DB::statement("
            CREATE TABLE IF NOT EXISTS clinic_filials (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address TEXT,
                uraddress TEXT,
                inn VARCHAR(20),
                edrpou VARCHAR(20),
                phone VARCHAR(20),
                clinic_id BIGINT NOT NULL,
                store_id BIGINT,
                ceo_id BIGINT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
        // Create users table (simplified version for clinic schema)
        // Spatie permissions require the users table to be in the same schema as the permission tables
        // DB::statement("
        //     CREATE TABLE IF NOT EXISTS users (
        //         id BIGSERIAL PRIMARY KEY,
        //         name VARCHAR(255) NOT NULL,
        //         email VARCHAR(255) UNIQUE NOT NULL,
        //         email_verified_at TIMESTAMP NULL,
        //         password VARCHAR(255) NOT NULL,
        //         remember_token VARCHAR(100) NULL,
        //         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        //         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        //     )
        // ");
        
        // Create roles table for Spatie permissions
        DB::statement("
            CREATE TABLE IF NOT EXISTS roles (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                guard_name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
        // Create permissions table for Spatie permissions
        DB::statement("
            CREATE TABLE IF NOT EXISTS permissions (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                guard_name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
        // Create role_has_permissions table for Spatie permissions
        DB::statement("
            CREATE TABLE IF NOT EXISTS role_has_permissions (
                permission_id BIGINT NOT NULL,
                role_id BIGINT NOT NULL,
                PRIMARY KEY (permission_id, role_id)
            )
        ");
        
        // Create model_has_roles table for Spatie permissions
        DB::statement("
            CREATE TABLE IF NOT EXISTS model_has_roles (
                role_id BIGINT NOT NULL,
                model_type VARCHAR(255) NOT NULL,
                model_id BIGINT NOT NULL,
                PRIMARY KEY (role_id, model_id, model_type)
            )
        ");
        
        // Create model_has_permissions table for Spatie permissions
        DB::statement("
            CREATE TABLE IF NOT EXISTS model_has_permissions (
                permission_id BIGINT NOT NULL,
                model_type VARCHAR(255) NOT NULL,
                model_id BIGINT NOT NULL,
                PRIMARY KEY (permission_id, model_id, model_type)
            )
        ");
        
        // Create currencies table
        DB::statement("
            CREATE TABLE IF NOT EXISTS currencies (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(10) NOT NULL,
                symbol VARCHAR(3) DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
        // Create currency_exchanges table
        DB::statement("
            CREATE TABLE IF NOT EXISTS currency_exchanges (
                id BIGSERIAL PRIMARY KEY,
                clinic_id BIGINT NOT NULL,
                currency_id BIGINT NOT NULL,
                rate_value DECIMAL(10, 4) NOT NULL,
                rate_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
        // Create additional clinic-specific tables as needed
        // This is a simplified version - you may need to add more tables based on your requirements

        
        DB::statement("
            CREATE TABLE IF NOT EXISTS services (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price DECIMAL(10, 2) DEFAULT 0.00,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
        // Create clinic_filial_user table
        DB::statement("
            CREATE TABLE IF NOT EXISTS clinic_filial_user (
                id BIGSERIAL PRIMARY KEY,
                clinic_id BIGINT NOT NULL,
                filial_id BIGINT NOT NULL,
                user_id BIGINT NOT NULL,
                role_id BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        // Create stores table
        DB::statement("
            CREATE TABLE IF NOT EXISTS stores (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address TEXT,
                uraddress TEXT,
                phone VARCHAR(20),
                user_id BIGINT,
                filial_id BIGINT,
                clinic_id BIGINT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create price_categories table
        DB::statement("
            CREATE TABLE IF NOT EXISTS price_categories (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                clinic_id BIGINT NOT NULL,
                parent_id BIGINT,
                producer_id BIGINT,
                percent DECIMAL(5, 2) DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create pricings table
        DB::statement("
            CREATE TABLE IF NOT EXISTS pricings (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                clinic_id BIGINT NOT NULL,
                category_id BIGINT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create schedulers table
        DB::statement("
            CREATE TABLE IF NOT EXISTS schedulers (
                id BIGSERIAL PRIMARY KEY,
                title VARCHAR(255),
                clinic_id BIGINT,
                doctor_id BIGINT,
                patient_id BIGINT,
                cabinet_id BIGINT,
                event_date DATE,
                event_time_from TIME,
                event_time_to TIME,
                description TEXT,
                status_color VARCHAR(255),
                status_name INTEGER,
                services TEXT,
                priority BOOLEAN,
                assistent_id INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create patient_statuses table
        DB::statement("
            CREATE TABLE IF NOT EXISTS patient_statuses (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                discount DOUBLE PRECISION NOT NULL DEFAULT 0,
                clinic_id INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create size table
        DB::statement("
            CREATE TABLE IF NOT EXISTS size (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                clinic_id BIGINT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create unit table
        DB::statement("
            CREATE TABLE IF NOT EXISTS unit (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                unit_qty INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create taxes table
        DB::statement("
            CREATE TABLE IF NOT EXISTS taxes (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                value DOUBLE PRECISION NOT NULL
            )
        ");

        // Create store_materials table
        DB::statement("
            CREATE TABLE IF NOT EXISTS store_materials (
                id BIGSERIAL PRIMARY KEY,
                doc_date TIMESTAMP,
                document_type VARCHAR(255),
                document_id BIGINT,
                store_id BIGINT,
                material_id BIGINT,
                producer_id BIGINT,
                qty DOUBLE PRECISION,
                store_qty DOUBLE PRECISION,
                unit_id BIGINT,
                fact_qty DOUBLE PRECISION,
                store_fact_qty DOUBLE PRECISION,
                fact_unit_id BIGINT,
                price_per_unit DOUBLE PRECISION,
                pack_qty DOUBLE PRECISION,
                pack_unit_id BIGINT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create patient_access table
        DB::statement("
            CREATE TABLE IF NOT EXISTS patient_access (
                id BIGSERIAL PRIMARY KEY,
                patient_id BIGINT NOT NULL,
                service_name VARCHAR(255) NOT NULL,
                status VARCHAR(255) DEFAULT 'active' CHECK (status IN ('active', 'expired')),
                start_date DATE NULL,
                end_date DATE NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create patient_treatment table
        DB::statement("
            CREATE TABLE IF NOT EXISTS patient_treatment (
                id BIGSERIAL PRIMARY KEY,
                patient_id BIGINT NOT NULL,
                clinic_id BIGINT NOT NULL,
                filial_id BIGINT,
                treatment_date DATE NOT NULL,
                diagnosis VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create treatment_details table
        DB::statement("
            CREATE TABLE IF NOT EXISTS treatment_details (
                id BIGSERIAL PRIMARY KEY,
                treatment_id BIGINT NOT NULL,
                procedure VARCHAR(255) NOT NULL,
                medications TEXT,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create audit_logs table
        DB::statement("
            CREATE TABLE IF NOT EXISTS audit_logs (
                id BIGSERIAL PRIMARY KEY,
                user_id BIGINT NOT NULL,
                action VARCHAR(50) NOT NULL,
                entity_type VARCHAR(100),
                entity_id BIGINT,
                clinic_id BIGINT,
                filial_id BIGINT,
                old_data JSONB,
                new_data JSONB,
                ip_address VARCHAR(45),
                user_agent TEXT,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Create indexes for audit_logs
        DB::statement("CREATE INDEX IF NOT EXISTS audit_logs_user_id_created_at_idx ON audit_logs (user_id, created_at)");
        DB::statement("CREATE INDEX IF NOT EXISTS audit_logs_clinic_id_created_at_idx ON audit_logs (clinic_id, created_at)");
        DB::statement("CREATE INDEX IF NOT EXISTS audit_logs_entity_type_entity_id_idx ON audit_logs (entity_type, entity_id)");
        DB::statement("CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs (created_at)");
    }

    protected function createDefaultCatalogs(): void
    {
        // Material categories
        DB::statement("
            CREATE TABLE IF NOT EXISTS material_categories (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                special BOOLEAN,
                percent DOUBLE PRECISION DEFAULT 0,
                parent_id BIGINT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Producers
        DB::statement("
            CREATE TABLE IF NOT EXISTS producers (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                percent DOUBLE PRECISION DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Materials
        DB::statement("
            CREATE TABLE IF NOT EXISTS materials (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category_id BIGINT NOT NULL,
                producer_id BIGINT,
                unit_id BIGINT,
                size_id BIGINT,
                producer_id BIGINT,
                price NUMERIC(12,2) DEFAULT 0,
                discount_percent DOUBLE PRECISION DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Service categories
        DB::statement("
            CREATE TABLE IF NOT EXISTS service_categories (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                special BOOLEAN,
                parent_id BIGINT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Services
        DB::statement("
            CREATE TABLE IF NOT EXISTS services (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category_id BIGINT,
                price NUMERIC(12,2) DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        DB::statement("
            CREATE TABLE IF NOT EXISTS service_components (
                id BIGSERIAL PRIMARY KEY,
                service_id BIGINT NOT NULL REFERENCES services(id) ON DELETE CASCADE,
                component_type VARCHAR(50) NOT NULL,   -- 'material' или 'work'
                component_id BIGINT,                   -- material_id или null для работы врача
                qty NUMERIC(12,2) DEFAULT 1,          -- количество материала/работы
                price NUMERIC(12,2) DEFAULT 0,        -- цена материала/работы
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Units
        DB::statement("
            CREATE TABLE IF NOT EXISTS unit (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                unit_qty INTEGER,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Cabinets
        DB::statement("
            CREATE TABLE IF NOT EXISTS cabinets (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                filial_id BIGINT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Payment methods
        DB::statement("
            CREATE TABLE IF NOT EXISTS payment_methods (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
    }


    /**
    * Create all document-related tables inside clinic schema
     * Create all document-related tables inside clinic schema
     * @return void
    */
    protected function createDefaultDocuments(): void
    {
        
        // Acts (Акты выполненных работ)
        DB::statement("
            CREATE TABLE IF NOT EXISTS acts (
                id BIGSERIAL PRIMARY KEY,
                filial_id BIGINT NOT NULL,
                act_number VARCHAR(50),
                act_date TIMESTAMP NOT NULL,
                patient_id BIGINT NOT NULL,
                doctor_id BIGINT,
                visit_id BIGINT,
                total_amount NUMERIC(12,2) NOT NULL,
                status VARCHAR(50) DEFAULT 'draft',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Act items
        DB::statement("
            CREATE TABLE IF NOT EXISTS act_items (
                id BIGSERIAL PRIMARY KEY,
                act_id BIGINT NOT NULL,
                service_id BIGINT NOT NULL,
                qty NUMERIC(12,2) NOT NULL DEFAULT 1,
                price NUMERIC(12,2) NOT NULL,
                total NUMERIC(12,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Invoices (Приход/Расход)
        DB::statement("
            CREATE TABLE IF NOT EXISTS invoices (
                id BIGSERIAL PRIMARY KEY,
                filial_id BIGINT NOT NULL,
                store_id BIGINT NOT NULL,
                supplier_id BIGINT,
                invoice_number VARCHAR(100),
                invoice_date TIMESTAMP NOT NULL,
                total_amount NUMERIC(12,2) NOT NULL,
                document_type VARCHAR(50) NOT NULL DEFAULT 'income', -- 'income' или 'expense'
                status VARCHAR(50) DEFAULT 'draft',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Invoice items
        DB::statement("
            CREATE TABLE IF NOT EXISTS invoice_items (
                id BIGSERIAL PRIMARY KEY,
                invoice_id BIGINT NOT NULL,
                material_id BIGINT NOT NULL,
                qty NUMERIC(12,2) NOT NULL,         -- количество по документу
                price NUMERIC(12,2) NOT NULL,
                total NUMERIC(12,2) NOT NULL,
                pack_qty NUMERIC(12,2) DEFAULT 1,   -- количество в упаковке
                fact_qty NUMERIC(12,2) DEFAULT 0,   -- фактически получено
                unit_id BIGINT,                      -- единица измерения материала
                pack_unit_id BIGINT,                 -- единица упаковки
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Displacements (перемещения материалов)
        DB::statement("
            CREATE TABLE IF NOT EXISTS displacements (
                id BIGSERIAL PRIMARY KEY,
                filial_id BIGINT NOT NULL,
                store_from_id BIGINT,
                store_to_id BIGINT,
                disp_number VARCHAR(100),
                disp_date TIMESTAMP NOT NULL,
                status VARCHAR(50) DEFAULT 'draft',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Displacement items
        DB::statement("
            CREATE TABLE IF NOT EXISTS displacement_items (
                id BIGSERIAL PRIMARY KEY,
                displacement_id BIGINT NOT NULL,
                material_id BIGINT NOT NULL,
                qty NUMERIC(12,2) NOT NULL,        -- количество по документу
                pack_qty NUMERIC(12,2) DEFAULT 1,  -- количество в упаковке
                fact_qty NUMERIC(12,2) DEFAULT 0,  -- фактически перемещено
                unit_id BIGINT,                     -- единица измерения материала
                pack_unit_id BIGINT,                -- единица упаковки
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Payments
        DB::statement("
            CREATE TABLE IF NOT EXISTS payments (
                id BIGSERIAL PRIMARY KEY,
                filial_id BIGINT NOT NULL,
                patient_id BIGINT NOT NULL,
                act_id BIGINT,
                payment_date TIMESTAMP NOT NULL,
                amount NUMERIC(12,2) NOT NULL,
                method VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Unified document operations log
        DB::statement("
            CREATE TABLE IF NOT EXISTS document_operations (
                id BIGSERIAL PRIMARY KEY,
                operation_date TIMESTAMP NOT NULL,
                operation_number VARCHAR(255),
                document_id BIGINT NOT NULL,
                document_type VARCHAR(255) NOT NULL,
                operation_dt VARCHAR(255),
                subconto_dt JSONB,
                operation_kt VARCHAR(255),
                subconto_kt JSONB,
                quantity DOUBLE PRECISION,
                amount DOUBLE PRECISION,
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Store balances
        DB::statement("
            CREATE TABLE IF NOT EXISTS store_balances (
                id BIGSERIAL PRIMARY KEY,
                store_id BIGINT NOT NULL,
                material_id BIGINT NOT NULL,
                qty NUMERIC(12,2) NOT NULL DEFAULT 0,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Visit services table — чтобы акт знал какие услуги в визите
        DB::statement("
            CREATE TABLE IF NOT EXISTS visit_services (
                id BIGSERIAL PRIMARY KEY,
                visit_id BIGINT NOT NULL,
                service_id BIGINT NOT NULL,
                qty NUMERIC(12,2) DEFAULT 1,
                price NUMERIC(12,2) NOT NULL,
                total NUMERIC(12,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        // Ввод остатков
        DB::statement("
            CREATE TABLE IF NOT EXISTS opening_balances (
                id BIGSERIAL PRIMARY KEY,
                filial_id BIGINT NOT NULL,
                store_id BIGINT NOT NULL,
                ob_number VARCHAR(50),
                ob_date TIMESTAMP NOT NULL,
                comment TEXT,
                status VARCHAR(50) DEFAULT 'draft',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

        DB::statement("
            CREATE TABLE IF NOT EXISTS opening_balance_items (
                id BIGSERIAL PRIMARY KEY,
                opening_balance_id BIGINT NOT NULL,
                material_id BIGINT NOT NULL,
                qty NUMERIC(12,2) NOT NULL DEFAULT 0,
                pack_qty NUMERIC(12,2) DEFAULT 1,   -- количество в упаковке
                fact_qty NUMERIC(12,2) DEFAULT 0,  -- фактически получено
                price NUMERIC(12,2) DEFAULT 0,
                total NUMERIC(12,2) DEFAULT 0,
                unit_id BIGINT,                     -- единица измерения материала
                pack_unit_id BIGINT,                -- единица упаковки
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");

    }

    
    /**
     * Create default roles for the clinic
     *
     * @return void
     */
    protected function createDefaultRoles(): void
    {
        $defaultRoles = ['ceo', 'ceo_filial', 'doctor', 'nurse', 'receptionist'];
        
        foreach ($defaultRoles as $roleName) {
            DB::table('roles')->insert([
                'name' => $roleName,
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
    
    /**
     * Create default permissions for the clinic
     *
     * @return void
     */
    protected function createDefaultPermissions(): void
    {
        // Get default permissions from the Permissions class
        $defaultPermissions = \App\Constants\Permissions::DEFAULT_PERMISSIONS;
        
        foreach ($defaultPermissions as $permissionName) {
            DB::table('permissions')->insert([
                'name' => $permissionName,
                'guard_name' => 'web',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
    
    /**
     * Create default currencies for the clinic
     *
     * @return void
     */
    protected function createDefaultCurrencies(int $clinicId): void
    {
        // Create default currencies
        $defaultCurrencies = [
            ['name' => 'USD', 'symbol' => '$'],
            ['name' => 'EUR', 'symbol' => '€'],
            ['name' => 'UAH', 'symbol' => '₴'],
        ];
        
        foreach ($defaultCurrencies as $currency) {
            // Insert currency
            $currencyId = DB::table('currencies')->insertGetId([
                'name' => $currency['name'],
                'symbol' => $currency['symbol'],
                'created_at' => now(),
                'updated_at' => now()
            ]);
            
            // Insert default exchange rate (1:1 for base currency)
            DB::table('currency_exchanges')->insert([
                'clinic_id' => $clinicId,
                'currency_id' => $currencyId,
                'rate_value' => 1.0000,
                'rate_date' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }

    /**
     * Create default store for the clinic
     *
     * @param int $clinicId
     * @return void
     */
    protected function createDefaultStore(int $clinicId): void
    {
        DB::table('stores')->insert([
            'name' => 'Main Store',
            'clinic_id' => $clinicId,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }

    /**
     * Create default patient statuses for the clinic
     *
     * @param int $clinicId
     * @return void
     */
    protected function createDefaultPatientStatuses(int $clinicId): void
    {
        $statuses = [
            'planned',
            'confirm',
            'done',
            'missed',
            'postponed',
            'noanswer',
            'late',
            'inclicnic',
            'incabinet',
            'decline',
        ];

        foreach ($statuses as $status) {
            DB::table('patient_statuses')->insert([
                'name' => $status,
                'discount' => 0,
                'clinic_id' => $clinicId,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }

    /**
     * Create default patient statuses for the clinic
     *
     * @param int $clinicId
     * @return void
     */
    protected function createDefaultInvoiceStatuses(int $clinicId): void
    {
        $statuses = [
            'planned',
            'confirm',
            'done',
            'missed',
            'postponed',
            'noanswer',
            'late',
            'inclicnic',
            'incabinet',
            'decline',
        ];

        foreach ($statuses as $status) {
            DB::table('patient_statuses')->insert([
                'name' => $status,
                'discount' => 0,
                'clinic_id' => $clinicId,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
}