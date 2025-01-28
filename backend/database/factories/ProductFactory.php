<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    
    protected $model = Product::class;


    public function definition()
    {
        return [
            'name' => $this->faker->word(), // Nombre del producto
            'description' => $this->faker->sentence(), // Descripción
            'price' => $this->faker->randomFloat(2, 10, 500), // Precio entre 10 y 500
            'stock' => $this->faker->numberBetween(0, 100), // Stock entre 0 y 100
        ];
    }
}
