import { useState } from 'react';
import LoginForm from './components/LoginForm.jsx';
import TodoApp from './components/TodoApp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 text-right">
        {isLoggedIn && (
          <button onClick={handleLogout} className="text-blue-600 hover:underline">
            Đăng xuất
          </button>
        )}
      </div>
      {isLoggedIn ? <TodoApp /> : <LoginForm onLogin={() => setIsLoggedIn(true)} />}
    </div>
  );
}

export default App;
