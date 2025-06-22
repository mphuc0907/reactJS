<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;
use App\Models\User;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $todos = $user->isAdmin()
            ? Todo::with('user')->orderBy('stt')->get()
            : $user->todos()->orderBy('stt')->get();

        return response()->json($todos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'      => 'required|string|max:255',
            'stt'        => 'required|integer',
            'content'    => 'nullable|string',
            'status'     => 'in:pending,in_progress,done',
            'start_date' => 'nullable|date',
            'end_date'   => 'nullable|date|after_or_equal:start_date',
            'id_user'    => 'nullable|exists:users,id', // chỉ dùng cho admin
        ]);

        $user = $request->user();

        $data = $request->only(['title', 'stt', 'content', 'status', 'start_date', 'end_date']);

        // Nếu là admin và có id_user thì dùng id_user chỉ định
        if ($user->isAdmin() && $request->has('id_user')) {
            $data['id_user'] = $request->id_user;
        } else {
            $data['id_user'] = $user->id;
        }

        $todo = Todo::create($data);

        return response()->json(['message' => 'Tạo todo thành công', 'todo' => $todo], 201);
    }

    /**
     * Display the specified resource.
     */
    private function findTodo($id)
    {
        $todo = Todo::findOrFail($id);
        $user = auth()->user();

        if ($user->isAdmin() || $todo->id_user === $user->id) {
            return $todo;
        }

        abort(403, 'Bạn không có quyền truy cập Todo này');
    }

    public function show($id)
    {
        $todo = $this->findTodo($id);
        return response()->json($todo);
    }

    public function update(Request $request, $id)
    {
        $todo = $this->findTodo($id);

        $data = $request->validate([
            'title'      => 'sometimes|required|string|max:255',
            'stt'        => 'sometimes|required|integer',
            'content'    => 'nullable|string',
            'status'     => 'in:pending,in_progress,done',
            'start_date' => 'nullable|date',
            'end_date'   => 'nullable|date|after_or_equal:start_date',
        ]);

        $todo->update($data);

        return response()->json(['message' => 'Cập nhật thành công', 'todo' => $todo]);
    }

    public function destroy($id)
    {
        $todo = $this->findTodo($id);
        $todo->delete();
        return response()->json(['message' => 'Xóa thành công']);
    }
}
