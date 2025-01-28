<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
    ];

    // Relación con el usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Se define la relación con los productos a través de la tabla intermedia 'cart_product'
    public function products()
    {
        return $this->belongsToMany(Product::class, 'cart_products') //Se Especifica el nombre de la tabla intermedia
            ->withPivot('quantity') //Se incluye el campo `quantity` de la tabla intermedia
            ->withTimestamps(); //Se incluye las marcas de tiempo de la tabla intermedia
    }
}
