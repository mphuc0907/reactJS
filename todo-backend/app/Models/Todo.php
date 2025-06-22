<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'stt',
        'content',
        'id_user',
        'status',
        'start_date',
        'end_date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    public function todos()
    {
        return $this->hasMany(Todo::class, 'id_user');
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}
