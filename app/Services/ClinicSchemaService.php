<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class ClinicSchemaService
{
    /**
     * Create a new schema for the clinic with all required tables
     *
     * @param int $clinicId
     * @return void
     */
    public function createClinicSchema(int $clinicId): void
    {
        $schemaName = 'clinic_' . $clinicId;
        
        // Create the schema
        DB::statement("CREATE SCHEMA IF NOT EXISTS {$schemaName}");
        
        // Save current search_path
        $originalSearchPath = DB::select("SHOW search_path")[0]->search_path;
        
        try {
            // Set search_path to new schema
            DB::statement("SET search_path TO {$schemaName}");
            
            // Create all required tables
            $this->createClinicTables();
        } finally {
            // Restore original search_path
            DB::statement("SET search_path TO {$originalSearchPath}");
        }
    }
    
    /**
     * Create all required tables in the current schema
     *
     * @return void
     */
    protected function createClinicTables(): void
    {
        $this->createClinicFilialsTable();
        $this->createClinicFilialUserTable();
        $this->createSchedulersTable();
        $this->createCabinetsTable();
        $this->createMaterialsTable();
        $this->createMaterialCategoriesTable();
        $this->createProducersTable();
        $this->createServicesTable();
        $this->createServiceItemsTable();
        $this->createStoresTable();
        $this->createStoreMaterialsTable();
        $this->createUnitsTable();
        $this->createSizesTable();
    }
    
    /**
     * Create clinic_filials table
     *
     * @return void
     */
    protected function createClinicFilialsTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS clinic_filials (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                uraddress VARCHAR(255) NOT NULL,
                inn VARCHAR(255) NOT NULL,
                edrpou VARCHAR(255) NOT NULL,
                phone VARCHAR(255) NOT NULL,
                clinic_id BIGINT,
                filial_id BIGINT,
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
    
    /**
     * Create clinic_filial_user table
     *
     * @return void
     */
    protected function createClinicFilialUserTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS clinic_filial_user (
                id BIGSERIAL PRIMARY KEY,
                clinic_id BIGINT NOT NULL,
                filial_id BIGINT NOT NULL,
                user_id BIGINT NOT NULL,
                role_id BIGINT,
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
    
    /**
     * Create schedulers table
     *
     * @return void
     */
    protected function createSchedulersTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS schedulers (
                id BIGSERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                clinic_id BIGINT,
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
    
    /**
     * Create cabinets table
     *
     * @return void
     */
    protected function createCabinetsTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS cabinets (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                place_count VARCHAR(255),
                filial_id BIGINT,
                clinic_id BIGINT,
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
    
    /**
     * Create materials table
     *
     * @return void
     */
    protected function createMaterialsTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS materials (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                clinic_id BIGINT,
                category_id BIGINT,
                unit_id BIGINT,
                size_id BIGINT,
                producer_id BIGINT,
                price DECIMAL(8,2),
                retail_price DECIMAL(8,2),
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
    
    /**
     * Create material_categories table
     *
     * @return void
     */
    protected function createMaterialCategoriesTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS material_categories (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                clinic_id BIGINT,
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
    
    /**
     * Create producers table
     *
     * @return void
     */
    protected function createProducersTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS producers (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                clinic_id BIGINT,
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
    
    /**
     * Create services table
     *
     * @return void
     */
    protected function createServicesTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS services (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                clinic_id BIGINT,
                category_id BIGINT,
                price DECIMAL(8,2),
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
    
    /**
     * Create service_items table
     *
     * @return void
     */
    protected function createServiceItemsTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS service_items (
                id BIGSERIAL PRIMARY KEY,
                service_id BIGINT NOT NULL,
                material_id BIGINT,
                quantity DECIMAL(8,2),
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
    
    /**
     * Create stores table
     *
     * @return void
     */
    protected function createStoresTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS stores (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255),
                uraddress VARCHAR(255),
                phone VARCHAR(255),
                filial_id BIGINT,
                clinic_id BIGINT,
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
    
    /**
     * Create store_materials table
     *
     * @return void
     */
    protected function createStoreMaterialsTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS store_materials (
                id BIGSERIAL PRIMARY KEY,
                store_id BIGINT NOT NULL,
                material_id BIGINT NOT NULL,
                quantity DECIMAL(8,2),
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
    
    /**
     * Create units table
     *
     * @return void
     */
    protected function createUnitsTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS units (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
    
    /**
     * Create sizes table
     *
     * @return void
     */
    protected function createSizesTable(): void
    {
        DB::statement("
            CREATE TABLE IF NOT EXISTS sizes (
                id BIGSERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITHOUT TIME ZONE,
                updated_at TIMESTAMP WITHOUT TIME ZONE
            )
        ");
    }
}