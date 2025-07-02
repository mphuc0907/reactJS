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

        $query = Todo::query();

        if (!$user->isAdmin()) {
            $query->where('id_user', $user->id);
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                    ->orWhere('content', 'like', "%$search%");
            });
        }

        return response()->json($query->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'status' => 'in:pending,in_progress,done,review,overdue',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'id_user' => 'nullable|exists:users,id', // Cho phép admin tạo cho user khác
        ]);

        $todo = Todo::create([
            'title' => $request->title,
            'content' => $request->content,
            'status' => $request->status ?? 'pending',
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'id_user' => $user->isAdmin()
                ? ($request->id_user ?? $user->id)
                : $user->id,
        ]);

        return response()->json($todo, 201);
    }

    /**
     * Display the specified resource.
     */

    public function show($id)
    {
        $todo = $this->findTodo($id);
        return response()->json($todo);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::findOrFail($id);
        $this->authorizeAccess($todo);

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'status' => 'in:pending,in_progress,done,review,overdue',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $todo->update($request->only(['title', 'content', 'status', 'start_date', 'end_date']));

        return response()->json($todo);
    }

    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        $this->authorizeAccess($todo);

        $todo->delete();
        return response()->json(['message' => 'Todo deleted']);
    }

    private function authorizeAccess($todo)
    {
        $user = auth()->user();
        if (!$user->isAdmin() && $todo->id_user !== $user->id) {
            abort(403, 'Unauthorized');
        }
    }
}
