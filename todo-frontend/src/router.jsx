import { createBrowserRouter } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserList from "./pages/Admin/UserList";
import AssignTodo from "./pages/Admin/AssignTodo";
import EditTodo from "./pages/User/EditTodo";
import AddTodo from "./pages/User/AddTodo";
import MyTodos from "./pages/User/MyTodos";
import Homepage from "./pages/Main/homepage";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/admin/users",
    element: <UserList />,
  },
  {
    path: "/admin/todos/assign",
    element: <AssignTodo />,
  },
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/todos/add",
    element: <AddTodo />,
  },
  {
    path: "/my-todos",
    element: <MyTodos />,
  },
  {
    path: "/todos/edit/:id",
    element: <EditTodo />,
  },
]);

export default router;
