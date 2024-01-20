<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\PostResource;

class CommentResource extends JsonResource
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
            'Ime korisnika koji je ostavio komentar: '=> $this->resource->user->name, 
            'datum' => $this->resource->datum,
            'tekst' => $this->resource->tekst,

        ];
    }
}
