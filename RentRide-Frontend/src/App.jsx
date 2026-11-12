import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./extra.css";
import { AuthProvider } from "./AuthContext";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import AdminBookings from "./pages/AdminBookings";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/cars/:id" element={<CarDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/my-bookings"
            element={
              <RequireAuth>
                <MyBookings />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <RequireAuth role="admin">
                <AdminBookings />
              </RequireAuth>
            }
          />
          <Route path="*" element={<p className="page-msg">ไม่พบหน้านี้</p>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
