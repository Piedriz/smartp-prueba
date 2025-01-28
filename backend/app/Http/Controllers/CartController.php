<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Mostrar los productos en el carrito
    public function index()
    {
        $cart = Auth::user()->cart; // Obtiene el carrito del usuario
        if (!$cart) {
            return response()->json(['message' => 'No hay carrito para este usuario'], 404);
        }

        return response()->json($cart->products);

    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id', // Validar que el producto exista
            'quantity' => 'required|integer|min:1' // Validar que la cantidad sea positiva
        ]);
        
        $product = Product::find($request->product_id);
        
        // Obtener el carrito del usuario autenticado
        $cart = Auth::user()->cart;
        
        // Verificar si el producto ya está en el carrito
        $existingProduct = $cart->products()->where('product_id', $product->id)->first();
        
        if ($existingProduct) {
            // Si el producto ya existe en el carrito, actualizar la cantidad
            $cart->products()->updateExistingPivot($product->id, [
                'quantity' => $existingProduct->pivot->quantity + $request->quantity
            ]);
        } else {
            // Si el producto no existe, agregarlo al carrito
            $cart->products()->attach($product->id, [
                'quantity' => $request->quantity
            ]);
        }

        return response()->json(['message' => 'Producto agregado al carrito con éxito']);
    }

    public function update(Request $request, $productId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1' // Validar que la cantidad sea positiva
        ]);

        $product = Product::find($productId);

        // Obtener el carrito del usuario autenticado
        $cart = Auth::user()->cart;

        // Verificar si el producto está en el carrito
        $existingProduct = $cart->products()->where('product_id', $product->id)->first();

        if ($existingProduct) {
            // Actualizar la cantidad del producto en el carrito
            $cart->products()->updateExistingPivot($product->id, [
                'quantity' => $request->quantity
            ]);
            return response()->json(['message' => 'Cantidad actualizada con éxito']);
        }

        return response()->json(['message' => 'El producto no está en el carrito'], 404);
    }

    public function destroy($productId)
    {
        $product = Product::find($productId);

        // Obtener el carrito del usuario autenticado
        $cart = Auth::user()->cart;

        // Verificar si el producto está en el carrito
        $existingProduct = $cart->products()->where('product_id', $product->id)->first();

        if ($existingProduct) {
            // Eliminar el producto del carrito
            $cart->products()->detach($product->id);
            return response()->json(['message' => 'Producto eliminado del carrito']);
        }

        return response()->json(['message' => 'El producto no está en el carrito'], 404);
    }

}
