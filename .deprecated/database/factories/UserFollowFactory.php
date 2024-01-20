<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\UserFollow;
use App\Models\User;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserFollow>
 */
class UserFollowFactory extends Factory
{
    protected $model = UserFollow::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        //da ne prati sam sebe user
        $followerId = User::inRandomOrder()->value('id');
        $followedId = User::where('id', '!=', $followerId)->inRandomOrder()->value('id');
        $statusPracenja = $this->faker->randomElement(['prati', 'poslat zahtev']);
        
        return [
            'follower_id' => $followerId,
            'followed_id' => $followedId,
            'statusPracenja' => $statusPracenja,
            'datum' => Carbon::now(),
        ];
    }
}
