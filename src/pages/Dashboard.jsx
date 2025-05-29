import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <h2>Chào mừng, {email}</h2>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}
