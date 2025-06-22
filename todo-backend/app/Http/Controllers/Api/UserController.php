<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
{
    if (! $request->user()->isAdmin()) {
        return response()->json(['message' => 'Bạn không có quyền truy cập'], 403);
    }

    return response()->json(User::select('id', 'name', 'email', 'role')->get());
}
}
