<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class UserSeeder extends Seeder
{
     /**
     * Run the database seeds.
     */
    public function run()
    {
        User::factory()->times(4)->create();



        $user1 = User::create([
            'name'=>"Andjela Mikic",
            'email'=>"andjamik33@gmail.com",
            'password' =>  Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
        $user1 = User::create([
            'name'=>"Andjela Radin",
            'email'=>"ar445@gmail.com",
            'password' =>  Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
        $user1 = User::create([
            'name'=>"Andjela Susa",
            'email'=>"susa33@gmail.com",
            'password' =>  Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
        $user1 = User::create([
            'name'=>"Andjela Rakic",
            'email'=>"andjarak44@gmail.com",
            'password' =>  Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
        $user1 = User::create([
            'name'=>"Andjela Joric",
            'email'=>"anjo23@gmail.com",
            'password' =>  Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
    }
}