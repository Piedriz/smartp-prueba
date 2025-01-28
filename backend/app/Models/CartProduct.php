<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartProduct extends Model
{
    protected $table = 'cart_products'; 
    protected $fillable = ['cart_id', 'product_id', 'quantity']; 

    // Relación con el modelo Cart
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
    
    // Relación con el modelo Product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}
