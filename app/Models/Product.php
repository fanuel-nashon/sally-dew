<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'type',
        'tagline',
        'description',
        'ingredients',
        'how_to_use',
        'price',
        'compare_at_price',
        'net_weight_g',
        'badge',
        'image',
        'stock',
        'is_active',
        'is_featured',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'integer',
            'compare_at_price' => 'integer',
            'net_weight_g' => 'integer',
            'stock' => 'integer',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    /** Only products that should be visible in the shop. */
    public function scopeActive(Builder $query): void
    {
        $query->where('is_active', true);
    }
}