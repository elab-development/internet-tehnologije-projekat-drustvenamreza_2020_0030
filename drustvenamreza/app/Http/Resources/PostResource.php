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
            'id' => $this->resource->id,
            'naslov' => $this->resource->naslov,
            'datum' => $this->resource->datum,
            'tekst' => $this->resource->tekst,
            'slika' => $this->resource->slika,
            'user_id' => $this->resource->user_id,
            'statusPosta' => $this->resource->statusPosta,
            'comments' => CommentResource::collection(optional($this->resource->comments))->toArray($request),
            
        ];
    }
}
