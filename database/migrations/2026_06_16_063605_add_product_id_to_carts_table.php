<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cart-items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained()->onDelete('cascade');
            $table->integer('product_id');
            $table->string('title');
            $table->decimal('price', 8, 2);
            $table->string('image');
            $table->integer('quantity')->default(1);
            $table->timestamps();
            //
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('carts', function (Blueprint $table) {
            //
        });
    }
};
