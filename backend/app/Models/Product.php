<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
    ];

    public function invoices()
    {
        return $this->belongsToMany(Invoice::class, 'invoice_product')->withPivot('quantity', 'price')->withTimestamps();
    }
}
