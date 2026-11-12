
function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">RentRide</h2>

      <div className="nav-links">
        <a href="/">หน้าแรก</a>
        <a href="#cars">รถทั้งหมด</a>
        <a href="#about">เกี่ยวกับเรา</a>
      </div>

      <div className="nav-actions">
        <a href="/login">เข้าสู่ระบบ</a>
        <button>สมัครสมาชิก</button>
      </div>
    </nav>
  );
}

export default Navbar;
