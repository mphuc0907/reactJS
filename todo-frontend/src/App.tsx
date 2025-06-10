import { useEffect, useState } from 'react';
import './App.css';
import LoginRegister from './page/LoginRegister';
import TodoPage from './page/TodoPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  return <>{isLoggedIn ? <TodoPage /> : <LoginRegister onLogin={() => setIsLoggedIn(true)} />}</>;
}

export default App
