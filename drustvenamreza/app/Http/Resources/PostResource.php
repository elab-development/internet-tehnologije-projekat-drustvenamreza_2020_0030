<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\CommentResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'naslov' => $this->naslov,
            'datum' => $this->datum,
            'tekst' => $this->tekst,
            'slika' => $this->slika,
            'user_id' => $this->user_id,
            'statusPosta' => $this->statusPosta,
            'user' => new UserResource($this->whenLoaded('user')), // Prikaz korisnika koji je kreirao post
            'comments' => CommentResource::collection($this->whenLoaded('comments')), // Prikaz svih komentara vezanih za post
        ];
    }
}
