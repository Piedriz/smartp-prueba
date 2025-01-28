<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Cart;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'nullable|string|in:admin,cliente'
        ]);
    
        // Si la validación falla
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        // Crear el nuevo usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'cliente' // Encriptar la contraseña
        ]);

        Cart::create([
            'user_id' => $user->id, // Asignar el carrito al usuario recién creado
        ]);
    
        return response()->json(['message' => 'Usuario creado con éxito', 'user' => $user], 201);
    }

    public function show(string $id)
    {
        $user = User::with('cart')->find($id);
    
        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json($user);
    }

    public function update(Request $request, string $id)
    {
          // Buscar el usuario
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Validar los datos
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $id,
            'password' => 'sometimes|required|string|min:6',
            'role' => '|string|in:admin,cliente',
            
        ]);

        // Si la validación falla
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Actualizar el usuario
        $user->update([
            'name' => $request->name ?? $user->name,
            'email' => $request->email ?? $user->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'role' => $request->role ?? $user->role
        ]);

        return response()->json(['message' => 'Usuario actualizado con éxito', 'user' => $user]);   
    }

   
    public function destroy(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    
        // Eliminar el usuario
        $user->delete();
    
        return response()->json(['message' => 'Usuario eliminado con éxito']);
    }
}
