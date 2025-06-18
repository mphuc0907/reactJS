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
            ? Todo::orderBy('stt')->get()
            : $user->todos()->orderBy('stt')->get();

        return response()->json($todos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'      => 'required|string|max:255',
            'content'    => 'nullable|string',
            'status'     => 'in:pending,in_progress,    ',
            'start_date' => 'nullable|date',
            'end_date'   => 'nullable|date|after_or_equal:start_date',
        ]);

        $data['id_user'] = auth()->id();

        // Lấy số thứ tự lớn nhất của user hiện tại
        $maxStt = Todo::where('id_user', auth()->id())->max('stt');

        // Nếu chưa có todo nào thì maxStt sẽ là null → gán stt = 1
        $data['stt'] = $maxStt ? $maxStt + 1 : 1;

        $todo = Todo::create($data);

        return response()->json(['message' => 'Tạo mới thành công', 'todo' => $todo]);
    }

    /**
     * Display the specified resource.
     */
    private function findTodo($id)
{
    $todo = Todo::findOrFail($id);

    if (auth()->user()->isAdmin() || $todo->id_user === auth()->id()) {
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
