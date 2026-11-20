<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Prices, weights and stock below are EXAMPLE values.
     * Change them to your real ones before going live.
     * Safe to run again: products are matched by slug and updated.
     */
    public function run(): void
    {
        $ingredients = 'Key ingredients: turmeric, rosemary oil, vitamin E. [Add the full ingredient list here.]';
        $howToUse = 'Wet skin and bar, lather between your hands, massage gently, then rinse well. Avoid contact with eyes. '
            .'Store on a draining dish so the bar lasts longer. Turmeric can tint light washcloths, so rinse them right after use.';

        $products = [
            [
                'name' => 'Turmeric & Rosemary Bar',
                'slug' => 'turmeric-rosemary-bar',
                'type' => 'single',
                'tagline' => 'Our signature golden bar',
                'description' => 'A golden everyday bar with turmeric, rosemary oil and vitamin E. '
                    .'Creamy lather, a fresh herbal scent and skin that feels soft, clean and glowing.',
                'price' => 8000,
                'net_weight_g' => 100,
                'badge' => 'Bestseller',
                'stock' => 50,
                'is_featured' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Glow Trio Value Pack',
                'slug' => 'glow-trio-value-pack',
                'type' => 'pack',
                'tagline' => 'Three bars, a month of golden washes',
                'description' => 'Three Turmeric & Rosemary bars at a better price. Perfect for the whole family, or to stock up.',
                'price' => 21000,
                'compare_at_price' => 24000,
                'net_weight_g' => 300,
                'badge' => 'Save 12%',
                'stock' => 20,
                'sort_order' => 2,
            ],
            [
                'name' => 'Golden Gift Box',
                'slug' => 'golden-gift-box',
                'type' => 'gift',
                'tagline' => 'Bar, soap dish and a handwritten note',
                'description' => 'One Turmeric & Rosemary bar with a wooden soap dish, wrapped in a gift box with your personal note.',
                'price' => 15000,
                'net_weight_g' => 100,
                'stock' => 10,
                'sort_order' => 3,
            ],
        ];

        foreach ($products as $data) {
            Product::updateOrCreate(
                ['slug' => $data['slug']],
                $data + [
                    'ingredients' => $ingredients,
                    'how_to_use' => $howToUse,
                    'image' => '/images/sally-dew-label.png',
                    'is_active' => true,
                ],
            );
        }
    }
}