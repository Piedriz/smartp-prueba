<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Invoice;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\PDF;

class InvoiceController extends Controller
{
    public function createInvoice()
    {
        $user = Auth::user();
        $cart = Auth::user()->cart;

        // Verificamos si el carrito está vacío
        if ($cart->products->isEmpty()) {
            return response()->json(['message' => 'El carrito está vacío. No se puede generar la factura.'], 400);
        }

        // Calculamos el total de la factura
        $total = $cart->products->sum(function ($product) {
            return $product->pivot->quantity * $product->price;
        });

        // Creamos la factura
        $invoice = Invoice::create([
            'user_id' => Auth::id(),
            'total' => $total
        ]);

        // Relacionamos los productos con la factura
        foreach ($cart->products as $product) {
            $invoice->products()->attach($product->id, [
                'quantity' => $product->pivot->quantity,
                'price' => $product->price,
            ]);
        }

        return response()->json(['message' => 'Factura generada con éxito', 'invoice' => $invoice]);
    }

    // Generar el PDF de la factura
    public function generatePDF($invoiceId)
    {
        $invoice = Invoice::with('products')->find($invoiceId);

        if (!$invoice) {
            return response()->json(['message' => 'Factura no encontrada'], 404);
        }

        // Pasar los datos a la vista que se usará para el PDF
        $pdf = PDF::loadView('invoices.pdf', compact('invoice'));
        // Retornar el PDF como descarga
        return $pdf->download('factura_' . $invoice->id . '.pdf');

    }
}
