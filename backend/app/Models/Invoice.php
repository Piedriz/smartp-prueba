<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total',  
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relación con los productos a través de la tabla intermedia 'cart_products'
    public function products()
    {
        return $this->belongsToMany(Product::class, 'invoice_product')
                    ->withPivot('quantity', 'price')  // Aquí definimos las columnas adicionales de la tabla intermedia
                    ->withTimestamps();  // Esto mantiene las marcas de tiempo
    }
}
