<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
Use Database\Seeders\UserSeeder;
Use Database\Seeders\UserFollowSeeder;
Use Database\Seeders\PostSeeder;
Use Database\Seeders\CommentSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            UserFollowSeeder::class,
            PostSeeder::class,
            CommentSeeder::class,
        ]);
    }
}
