<!DOCTYPE html>
<html>
<head>
    <title>Factura #{{ $invoice->id }}</title>
</head>
<body>
    <h1>Factura #{{ $invoice->id }}</h1>

    <h3>Datos del Cliente:</h3>
    <p>Nombre: {{ $invoice->user->name }}</p>
    <p>Email: {{ $invoice->user->email }}</p>

    <h3>Productos:</h3>
    <table border="1" cellpadding="5" cellspacing="0">
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoice->products as $product)
                <tr>
                    <td>{{ $product->name }}</td>
                    <td>{{ $product->pivot->quantity }}</td>
                    <td>${{ number_format($product->pivot->price, 2) }}</td>
                    <td>${{ number_format($product->pivot->quantity * $product->pivot->price, 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <h3>Total: ${{ number_format($invoice->total, 2) }}</h3>
</body>
</html>
