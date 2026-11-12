import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <h2 className="logo">RentRide</h2>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>
          หน้าแรก
        </NavLink>
        <NavLink to="/cars">รถทั้งหมด</NavLink>
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            {user.role === "admin" && <Link to="/admin/bookings">จัดการการจอง</Link>}
            <Link to="/my-bookings">การจองของฉัน</Link>
            <span className="nav-user">{user.name}</span>
            <button onClick={handleLogout}>ออกจากระบบ</button>
          </>
        ) : (
          <>
            <Link to="/login">เข้าสู่ระบบ</Link>
            <Link to="/register" className="btn-primary">
              สมัครสมาชิก
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
