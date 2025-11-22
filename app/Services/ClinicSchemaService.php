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
            
            // Create default roles
            $this->createDefaultRoles();
            
            // Create default permissions
            $this->createDefaultPermissions();
            
            // Create default currencies and exchange rates
            $this->createDefaultCurrencies($clinicId);
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
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
        // Create users table (simplified version for clinic schema)
        // Spatie permissions require the users table to be in the same schema as the permission tables
        DB::statement("
            CREATE TABLE IF NOT EXISTS users (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                email_verified_at TIMESTAMP NULL,
                password VARCHAR(255) NOT NULL,
                remember_token VARCHAR(100) NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
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
            CREATE TABLE IF NOT EXISTS patients (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(20),
                email VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
        
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
}