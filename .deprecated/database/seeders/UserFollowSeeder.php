<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\UserFollow;
use Carbon\Carbon;

class UserFollowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        UserFollow::create([
            'follower_id' => 5,
            'followed_id' => 7,
            'statusPracenja' => 'prati',
            'datum' => Carbon::now(),
           ]);
           UserFollow::create([
            'follower_id' => 6,
            'followed_id' => 7,
            'statusPracenja' => 'prati',
            'datum' => Carbon::now(),
           ]);

           UserFollow::create([
            'follower_id' => 7,
            'followed_id' => 1,
            'statusPracenja' => 'prati',
            'datum' => Carbon::now(),
           ]);
           UserFollow::create([
            'follower_id' => 7,
            'followed_id' => 4,
            'statusPracenja' => 'poslat zahtev',
            'datum' => Carbon::now(),
           ]);
           UserFollow::create([
            'follower_id' => 7,
            'followed_id' => 5,
            'statusPracenja' => 'prati',
            'datum' => Carbon::now(),
           ]);
           UserFollow::create([
            'follower_id' => 7,
            'followed_id' => 6,
            'statusPracenja' => 'prati',
            'datum' => Carbon::now(),
           ]);

           UserFollow::factory()->times(3)->create();
    }
}
