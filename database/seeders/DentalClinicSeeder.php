<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DentalClinicSeeder extends Seeder
{
    // Define properties to store IDs
    private $userId;
    private $clinicId;
    private $clinicFilialId;
    private $storeId;
    
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing data (in correct order to avoid foreign key constraints)
        $this->clearExistingData();
        
        // Create core data
        $this->createCurrencies();
        $this->createUnits();
        $this->createSizes();
        $this->createUser();
        $this->createClinic();
        $this->createClinicFilial();
        $this->createStore();
        $this->assignUserToClinic();
        $this->assignRoleToUser();
        
        // Create supporting data
        $this->createMaterialCategories();
        $this->createProducers();
        $this->createMaterials();
        $this->createPatients();
        $this->createTaxes();
        $this->createVatRates();
        
        // Create inventory
        $this->createStoreMaterials();
        
        // Create users with different roles
        $this->createUsersWithDifferentRoles();
        
        echo "Dental clinic sample data has been seeded successfully!\n";
    }
    
    private function clearExistingData()
    {
        // Clear data in reverse order of dependencies
        DB::table('store_materials')->delete();
        DB::table('patients')->delete();
        DB::table('clinic_patient')->delete();
        DB::table('materials')->delete();
        DB::table('producers')->delete();
        DB::table('material_categories')->delete();
        DB::table('users_to_clinics')->delete();
        DB::table('stores')->delete();
        DB::table('clinic_filials')->delete();
        DB::table('clinics')->delete();
        DB::table('users')->delete();
        DB::table('size')->delete(); // Fixed table name
        DB::table('unit')->delete();
        DB::table('currencies')->delete();
        DB::table('taxes')->delete();
        DB::table('vat_rates')->delete();
    }
    
    private function createCurrencies()
    {
        $currencies = [
            ['name' => 'USD - US Dollar'],
            ['name' => 'EUR - Euro'],
            ['name' => 'UAH - Ukrainian Hryvnia'],
        ];
        
        foreach ($currencies as $currency) {
            DB::table('currencies')->insert($currency);
        }
    }
    
    private function createUnits()
    {
        $units = [
            ['name' => 'Piece', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Box', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Pack', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Milliliter', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Gram', 'created_at' => now(), 'updated_at' => now()],
        ];
        
        foreach ($units as $unit) {
            DB::table('unit')->insert($unit);
        }
    }
    
    private function createSizes()
    {
        $sizes = [
            ['name' => 'Small', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Medium', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Large', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Extra Large', 'created_at' => now(), 'updated_at' => now()],
        ];
        
        foreach ($sizes as $size) {
            DB::table('size')->insert($size);
        }
    }
    
    private function createUser()
    {
        $userId = DB::table('users')->insertGetId([
            'name' => 'Admin User',
            'email' => 'admin@dentalclinic.com',
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        $this->userId = $userId;
    }
    
    private function createClinic()
    {
        $clinicId = DB::table('clinics')->insertGetId([
            'name' => 'Smile Perfect Dental Clinic',
            'address' => '123 Dental Street, Smile City',
            'uraddress' => '123 Dental Street, Smile City',
            'inn' => '1234567890',
            'edrpou' => '0987654321',
            'phone' => '+1234567890',
            'currency_id' => 1,
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        $this->clinicId = $clinicId;
    }
    
    private function createClinicFilial()
    {
        $clinicFilialId = DB::table('clinic_filials')->insertGetId([
            'name' => 'Main Branch',
            'address' => '123 Dental Street, Smile City',
            'uraddress' => '123 Dental Street, Smile City',
            'inn' => '1234567890',
            'edrpou' => '0987654321',
            'phone' => '+1234567890',
            'clinic_id' => $this->clinicId,
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        $this->clinicFilialId = $clinicFilialId;
    }
    
    private function createStore()
    {
        $storeId = DB::table('stores')->insertGetId([
            'name' => 'Main Storage',
            'address' => '123 Dental Street, Smile City',
            'uraddress' => '123 Dental Street, Smile City',
            'phone' => '+1234567890',
            'clinic_id' => $this->clinicId,
            'filial_id' => $this->clinicFilialId,
            'user_id' => $this->userId,
            'created_at' => now(),
            'updated_at' => now()
        ]);
        
        $this->storeId = $storeId;
    }
    
    private function assignUserToClinic()
    {
        DB::table('users_to_clinics')->insert([
            'user_id' => $this->userId,
            'filial_id' => $this->clinicFilialId,
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
    
    private function assignRoleToUser()
    {
        // Assign Admin role to the user
        DB::table('model_has_roles')->insert([
            'role_id' => 1, // Admin role
            'model_type' => 'App\Models\User',
            'model_id' => $this->userId
        ]);
    }
    
    private function createMaterialCategories()
    {
        $categories = [
            ['name' => 'Dental Materials', 'clinic_id' => $this->clinicId, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Hygiene Products', 'clinic_id' => $this->clinicId, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Orthodontic Supplies', 'clinic_id' => $this->clinicId, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Prosthetic Materials', 'clinic_id' => $this->clinicId, 'created_at' => now(), 'updated_at' => now()],
        ];
        
        foreach ($categories as $category) {
            DB::table('material_categories')->insert($category);
        }
    }
    
    private function createProducers()
    {
        $producers = [
            ['name' => 'DentalTech Inc.', 'clinic_id' => $this->clinicId, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'MediDent Solutions', 'clinic_id' => $this->clinicId, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'OrthoCare Pro', 'clinic_id' => $this->clinicId, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Prosthetic Masters', 'clinic_id' => $this->clinicId, 'created_at' => now(), 'updated_at' => now()],
        ];
        
        foreach ($producers as $producer) {
            DB::table('producers')->insert($producer);
        }
    }
    
    private function createMaterials()
    {
        $materials = [
            // Dental Materials
            ['name' => 'Dental Composite Resin', 'price' => 25.50, 'category_id' => 1, 'clinic_id' => $this->clinicId, 'unit_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Dental Implant System', 'price' => 150.00, 'category_id' => 1, 'clinic_id' => $this->clinicId, 'unit_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Porcelain Dental Crown', 'price' => 85.75, 'category_id' => 1, 'clinic_id' => $this->clinicId, 'unit_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Dental Amalgam', 'price' => 12.30, 'category_id' => 1, 'clinic_id' => $this->clinicId, 'unit_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            
            // Hygiene Products
            ['name' => 'Professional Teeth Whitening Gel', 'price' => 32.25, 'category_id' => 2, 'clinic_id' => $this->clinicId, 'unit_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Antibacterial Mouthwash', 'price' => 8.90, 'category_id' => 2, 'clinic_id' => $this->clinicId, 'unit_id' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Dental Floss', 'price' => 3.50, 'category_id' => 2, 'clinic_id' => $this->clinicId, 'unit_id' => 1, 'created_at' => now(), 'updated_at' => now()],
            
            // Orthodontic Supplies
            ['name' => 'Metal Brackets Set', 'price' => 45.00, 'category_id' => 3, 'clinic_id' => $this->clinicId, 'unit_id' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Orthodontic Wire', 'price' => 18.75, 'category_id' => 3, 'clinic_id' => $this->clinicId, 'unit_id' => 5, 'created_at' => now(), 'updated_at' => now()],
            
            // Prosthetic Materials
            ['name' => 'Denture Base Material', 'price' => 65.40, 'category_id' => 4, 'clinic_id' => $this->clinicId, 'unit_id' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Denture Teeth Set', 'price' => 38.20, 'category_id' => 4, 'clinic_id' => $this->clinicId, 'unit_id' => 3, 'created_at' => now(), 'updated_at' => now()],
        ];
        
        foreach ($materials as $material) {
            DB::table('materials')->insert($material);
        }
    }
    
    private function createPatients()
    {
        $patients = [
            ['first_name' => 'John', 'last_name' => 'Doe', 'phone' => '+1234567890', 'email' => 'john.doe@example.com', 'password' => Hash::make('password'), 'created_at' => now(), 'updated_at' => now()],
            ['first_name' => 'Jane', 'last_name' => 'Smith', 'phone' => '+1234567891', 'email' => 'jane.smith@example.com', 'password' => Hash::make('password'), 'created_at' => now(), 'updated_at' => now()],
            ['first_name' => 'Robert', 'last_name' => 'Johnson', 'phone' => '+1234567892', 'email' => 'robert.johnson@example.com', 'password' => Hash::make('password'), 'created_at' => now(), 'updated_at' => now()],
            ['first_name' => 'Emily', 'last_name' => 'Williams', 'phone' => '+1234567893', 'email' => 'emily.williams@example.com', 'password' => Hash::make('password'), 'created_at' => now(), 'updated_at' => now()],
            ['first_name' => 'Michael', 'last_name' => 'Brown', 'phone' => '+1234567894', 'email' => 'michael.brown@example.com', 'password' => Hash::make('password'), 'created_at' => now(), 'updated_at' => now()],
        ];
        
        $patientIds = [];
        foreach ($patients as $patient) {
            $patientIds[] = DB::table('patients')->insertGetId($patient);
        }
        
        // Connect patients to clinic
        foreach ($patientIds as $patientId) {
            DB::table('clinic_patient')->insert([
                'patient_id' => $patientId,
                'clinic_id' => $this->clinicId,
                'filial_id' => $this->clinicFilialId,
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
    
    private function createTaxes()
    {
        $taxes = [
            ['name' => 'VAT', 'value' => 20.00], // Fixed column name and removed timestamps
            ['name' => 'Service Tax', 'value' => 5.00], // Fixed column name and removed timestamps
        ];
        
        foreach ($taxes as $tax) {
            DB::table('taxes')->insert($tax);
        }
    }
    
    private function createVatRates()
    {
        $vatRates = [
            ['country' => 'USA', 'standard_rate' => 0.00, 'currency' => 'USD', 'note' => 'No VAT in USA', 'created_at' => now(), 'updated_at' => now()],
            ['country' => 'Ukraine', 'standard_rate' => 20.00, 'currency' => 'UAH', 'note' => 'Standard VAT rate', 'created_at' => now(), 'updated_at' => now()],
            ['country' => 'EU', 'standard_rate' => 20.00, 'currency' => 'EUR', 'note' => 'Standard VAT rate for EU', 'created_at' => now(), 'updated_at' => now()],
        ];
        
        foreach ($vatRates as $vatRate) {
            DB::table('vat_rates')->insert($vatRate);
        }
    }
    
    private function createStoreMaterials()
    {
        $storeMaterials = [
            // Initial inventory for Dental Composite Resin
            ['doc_date' => now(), 'document_type' => 'initial', 'document_id' => 1, 'store_id' => $this->storeId, 'material_id' => 1, 'producer_id' => 1, 'qty' => 100, 'store_qty' => 100, 'unit_id' => 1, 'fact_qty' => 100, 'store_fact_qty' => 100, 'fact_unit_id' => 1, 'price_per_unit' => 25.50, 'created_at' => now(), 'updated_at' => now()],
            
            // Initial inventory for Dental Implant System
            ['doc_date' => now(), 'document_type' => 'initial', 'document_id' => 1, 'store_id' => $this->storeId, 'material_id' => 2, 'producer_id' => 2, 'qty' => 50, 'store_qty' => 50, 'unit_id' => 1, 'fact_qty' => 50, 'store_fact_qty' => 50, 'fact_unit_id' => 1, 'price_per_unit' => 150.00, 'created_at' => now(), 'updated_at' => now()],
            
            // Initial inventory for Porcelain Dental Crown
            ['doc_date' => now(), 'document_type' => 'initial', 'document_id' => 1, 'store_id' => $this->storeId, 'material_id' => 3, 'producer_id' => 1, 'qty' => 75, 'store_qty' => 75, 'unit_id' => 1, 'fact_qty' => 75, 'store_fact_qty' => 75, 'fact_unit_id' => 1, 'price_per_unit' => 85.75, 'created_at' => now(), 'updated_at' => now()],
            
            // Initial inventory for Professional Teeth Whitening Gel
            ['doc_date' => now(), 'document_type' => 'initial', 'document_id' => 1, 'store_id' => $this->storeId, 'material_id' => 5, 'producer_id' => 3, 'qty' => 30, 'store_qty' => 30, 'unit_id' => 3, 'fact_qty' => 30, 'store_fact_qty' => 30, 'fact_unit_id' => 3, 'price_per_unit' => 32.25, 'created_at' => now(), 'updated_at' => now()],
            
            // Initial inventory for Metal Brackets Set
            ['doc_date' => now(), 'document_type' => 'initial', 'document_id' => 1, 'store_id' => $this->storeId, 'material_id' => 8, 'producer_id' => 3, 'qty' => 40, 'store_qty' => 40, 'unit_id' => 3, 'fact_qty' => 40, 'store_fact_qty' => 40, 'fact_unit_id' => 3, 'price_per_unit' => 45.00, 'created_at' => now(), 'updated_at' => now()],
        ];
        
        foreach ($storeMaterials as $storeMaterial) {
            DB::table('store_materials')->insert($storeMaterial);
        }
    }
    
    private function createUsersWithDifferentRoles()
    {
        // Create users with different roles
        $users = [
            [
                'name' => 'Dr. Smith',
                'email' => 'dr.smith@dentalclinic.com',
                'password' => Hash::make('password'),
                'role_id' => 5, // Doctor role
            ],
            [
                'name' => 'Nurse Johnson',
                'email' => 'nurse.johnson@dentalclinic.com',
                'password' => Hash::make('password'),
                'role_id' => 6, // Senior nurse role
            ],
            [
                'name' => 'Nurse Brown',
                'email' => 'nurse.brown@dentalclinic.com',
                'password' => Hash::make('password'),
                'role_id' => 7, // Nurse role
            ],
            [
                'name' => 'Customer Service',
                'email' => 'customer.service@dentalclinic.com',
                'password' => Hash::make('password'),
                'role_id' => 8, // Customer role
            ],
        ];
        
        foreach ($users as $userData) {
            $userId = DB::table('users')->insertGetId([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => $userData['password'],
                'created_at' => now(),
                'updated_at' => now()
            ]);
            
            // Assign user to clinic
            DB::table('users_to_clinics')->insert([
                'user_id' => $userId,
                'filial_id' => $this->clinicFilialId,
                'created_at' => now(),
                'updated_at' => now()
            ]);
            
            // Assign role to user
            DB::table('model_has_roles')->insert([
                'role_id' => $userData['role_id'],
                'model_type' => 'App\Models\User',
                'model_id' => $userId
            ]);
        }
    }
}