<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statusiPosta = ['objavljen', 'neobjavljen', 'arhiviran'];

        return [
            'naslov' => $this->faker->sentence(),
            'datum' => $this->faker->date(),
            'tekst' => $this->faker->paragraph(),
            'slika' => $this->faker->imageUrl(),
            'user_id' => User::factory(), 
            'statusPosta' => $this->faker->randomElement($statusiPosta),
        ];
    }
}
