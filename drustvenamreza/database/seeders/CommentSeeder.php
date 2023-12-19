<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $post1 = Post::factory()->create();
        $post2 = Post::factory()->create();

        //oni imaju smislene veze
        Comment::factory(3)->create([
            'user_id'=>$user1->id,
            'post_id'=>$post1->id
           ]);

        Comment::factory(2)->create([
            'user_id'=>$user2->id,
            'post_id'=>$post2->id
           ]);

        //random veze
        Comment::factory()->count(10)->create();



          
    }
}
