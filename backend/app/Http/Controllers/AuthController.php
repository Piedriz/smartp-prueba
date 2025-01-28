<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar los datos de entrada
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Intentar autenticar al usuario
        if (Auth::attempt($credentials)) {

            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            // Verificar el rol del usuario y devolver una respuesta diferente
            if ($user->isAdmin()) {
                return response()->json([
                    'message' => 'Login exitoso, eres admin',
                    'token' => $token,
                    'user' => $user
                ]);
            }

            return response()->json([
                'message' => 'Login exitoso, eres cliente',
                'token' => $token,
                'user' => $user
            ]);
        }

        return response()->json(['message' => 'Credenciales inválidas'], 401);
    }


    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Sesión cerrada exitosamente']);
    }
}
