<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'type' => $this->type,
            'tagline' => $this->tagline,
            'description' => $this->description,
            'ingredients' => $this->ingredients,
            'how_to_use' => $this->how_to_use,
            'price' => $this->price,
            'compare_at_price' => $this->compare_at_price,
            'net_weight_g' => $this->net_weight_g,
            'badge' => $this->badge,
            'image' => $this->image,
            'in_stock' => $this->stock > 0,
        ];
    }
}