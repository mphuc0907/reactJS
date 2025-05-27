import React, { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, input]);
      setInput('');
    }
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', fontFamily: 'Arial' }}>
      <h2>Todo List</h2>
      <div style={{ display: 'flex', marginBottom: 10 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập công việc..."
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleAddTodo} style={{ marginLeft: 8, padding: '8px 12px' }}>
          Thêm
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ marginBottom: 8 }}>
            {todo}
            <button
              onClick={() => handleDeleteTodo(index)}
              style={{ marginLeft: 10, color: 'white', background: 'red', border: 'none', padding: '4px 8px' }}
            >
              Xoá
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
