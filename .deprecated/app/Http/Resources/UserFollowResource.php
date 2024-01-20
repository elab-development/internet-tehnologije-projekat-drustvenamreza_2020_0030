<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class UserFollowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'statusPracenja' => $this->resource->statusPracenja,
            'datum' => $this->resource->datum,
            'follower_id' => $this->resource->follower_id,
            'followed_id' => $this->resource->followed_id,
            'follower' => new UserResource($this->resource->follower), // Prikaz korisnika koji prati
            'followed' => new UserResource($this->resource->followed), // Prikaz korisnika koji je pratilac
        ];
    }
}
