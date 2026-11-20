<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('type')->default('single'); // single, pack or gift
            $table->string('tagline')->nullable();
            $table->text('description')->nullable();
            $table->text('ingredients')->nullable();
            $table->text('how_to_use')->nullable();
            $table->unsignedInteger('price'); // whole Tanzanian shillings
            $table->unsignedInteger('compare_at_price')->nullable(); // old price, shown crossed out
            $table->unsignedInteger('net_weight_g')->nullable();
            $table->string('badge')->nullable(); // e.g. "Bestseller"
            $table->string('image')->nullable(); // path inside public/, e.g. /images/sally-dew-label.png
            $table->unsignedInteger('stock')->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};