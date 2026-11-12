import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

// ห่อหน้าที่ต้องล็อกอิน (และถ้าใส่ role ก็ต้องมีบทบาทนั้น)
// หมายเหตุ: นี่แค่ซ่อนหน้าให้ผู้ใช้ ตัวป้องกันจริงอยู่ที่ Backend (RequireLogin / RequireRole)
function RequireAuth({ role, children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p className="page-msg">กำลังโหลด...</p>;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (role && user.role !== role) return <p className="page-msg">คุณไม่มีสิทธิ์เข้าหน้านี้</p>;
  return children;
}

export default RequireAuth;
