import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Login from '../Auth/Login';
import Register from '../auth/Register';
import MyTodos from '../User/MyTodos';
import AddTodo from '../User/AddTodo';
import EditTodo from '../User/EditTodo';
import UserLayout from '../../layouts/UserLayout';
import AdminLayout from '../../layouts/AdminLayout';
import UserList from '../Admin/UserList';
import AllTodos from '../Admin/AllTodos';
import AssignTodo from '../Admin/AssignTodo';
import Homepage from './homepage';
// import { isLoggedIn } from '../../utils/auth';

function MainPage() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User routes */}
        <Route element={<UserLayout />}>
          <Route path="/my-todos" element={<MyTodos />} />
          <Route path="/todos/add" element={<AddTodo />} />
          <Route path="/todos/edit/:id" element={<EditTodo />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/todos" element={<AllTodos />} />
          <Route path="/admin/todos/assign" element={<AssignTodo />} />
        </Route>

        {/* Default redirect or 404 could be added here */}
      </Routes>
    </BrowserRouter>
  );
}

export default MainPage;