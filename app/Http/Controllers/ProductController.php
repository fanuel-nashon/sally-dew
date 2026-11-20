<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::active()->orderBy('sort_order')->get();

        return Inertia::render('shop/index', [
            'products' => ProductResource::collection($products)->resolve(),
        ]);
    }

    public function show(Product $product): Response
    {
        abort_unless($product->is_active, 404);

        $related = Product::active()
            ->whereKeyNot($product->id)
            ->orderBy('sort_order')
            ->take(3)
            ->get();

        return Inertia::render('shop/show', [
            'product' => (new ProductResource($product))->resolve(),
            'related' => ProductResource::collection($related)->resolve(),
        ]);
    }
}