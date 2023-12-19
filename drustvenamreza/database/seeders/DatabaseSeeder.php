<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
Use Database\Seeders\UserSeeder;
Use Database\Seeders\UserFollowSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       $userSeeder = new UserSeeder;
       $userSeeder->run(); 

       $userFollowSeeder = new UserFollowSeeder;
       $userFollowSeeder->run(); 
    }
}
