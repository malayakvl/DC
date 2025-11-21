<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class SampleDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first user, clinic, and clinic_filial
        $user = DB::table('users')->first();
        $clinic = DB::table('clinics')->first();
        $clinicFilial = DB::table('clinic_filials')->first();
        $store = DB::table('stores')->first();
        
        // Check if currencies already exist
        $existingCurrencies = DB::table('currencies')->count();
        
        if ($existingCurrencies == 0) {
            // Create sample currencies
            $currencies = [
                ['name' => 'USD - US Dollar'],
                ['name' => 'EUR - Euro'],
                ['name' => 'UAH - Ukrainian Hryvnia'],
            ];
            
            $currencyIds = [];
            foreach ($currencies as $currency) {
                $currencyIds[] = DB::table('currencies')->insertGetId($currency);
            }
            
            // Assign the first currency to the clinic
            DB::table('clinics')->where('id', $clinic->id)->update(['currency_id' => $currencyIds[0]]);
            
            echo "Currencies have been added successfully!\n";
        } else {
            echo "Currencies already exist, skipping currency creation.\n";
        }
        
        // Check if sizes already exist
        $existingSizes = DB::table('size')->count();
        
        if ($existingSizes == 0) {
            // Create sample sizes
            $sizes = [
                ['name' => 'Small', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'Medium', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'Large', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'Extra Large', 'created_at' => now(), 'updated_at' => now()],
            ];
            
            foreach ($sizes as $size) {
                DB::table('size')->insert($size);
            }
            
            echo "Sizes have been added successfully!\n";
        } else {
            echo "Sizes already exist, skipping size creation.\n";
        }
    }
}