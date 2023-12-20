<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Carbon\Carbon;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = User::create([
            'name'=>"Miroslav Mikic",
            'email'=>"mika33@gmail.com",
            'password' =>  Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
        $user2 = User::create([
            'name'=>"Aco Pejovic",
            'email'=>"acika67@gmail.com",
            'password' =>  Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);
        $user3 = User::create([
            'name'=>"Dragica Spasojevic",
            'email'=>"dragicaCica32@gmail.com",
            'password' =>  Hash::make('password'),
            'remember_token' => Str::random(10),
        ]);


        $post1 = Post::create([
            'naslov' => 'Slika moga psa u parku.🐶❤️',
            'datum' => Carbon::now()->format('Y-m-d'),
            'tekst' => 'Morala sam da obelezim ovaj predivan dan.',
            'slika' => 'https://ibb.co/LYz233N',
            'user_id' => $user3->id, 
            'statusPosta' => 'objavljen',
        ]);
        $post2 = Post::create([
            'naslov' => 'Slika moga psa u kuci.🐶❤️',
            'datum' => Carbon::now()->format('Y-m-d'),
            'tekst' => 'Nakon parka spavanjac.🐶💤',
            'slika' => 'https://ibb.co/2qkZXpf',
            'user_id' => $user3->id, 
            'statusPosta' => 'objavljen',
        ]);
        //oni imaju smislene veze
        Comment::create([
            'datum' => Carbon::now()->format('Y-m-d H:i:s'), 
            'tekst' => "Bas je slatko kuce!❤️", 
            'user_id'=>$user1->id,
            'post_id'=>$post1->id
           ]);

        Comment::create([
            'datum' => Carbon::now()->format('Y-m-d H:i:s'), 
            'tekst' => "Kako spava ludi cuko HA HA HA", 
            'user_id'=>$user2->id,
            'post_id'=>$post2->id
           ]);

        


          
    }
}
