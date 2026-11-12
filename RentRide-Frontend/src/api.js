// ที่อยู่ของ Backend: ตั้งผ่านไฟล์ .env.local (VITE_API_URL=...) ถ้าไม่ตั้งจะใช้ localhost:8080
const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export function getToken() {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem("token", token);
  } catch {
    // ใช้งานต่อได้ แต่รีเฟรชหน้าแล้วต้องล็อกอินใหม่
  }
}

export function clearToken() {
  try {
    localStorage.removeItem("token");
  } catch {
    // ไม่ต้องทำอะไร
  }
}

// เรียก API แล้วคืน JSON ถ้าไม่สำเร็จจะ throw ApiError ที่มีข้อความภาษาไทยจาก Backend
export async function api(path, { method = "GET", body } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "NETWORK", "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้ ลองใหม่อีกครั้ง");
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // บาง response ไม่มี body
  }

  if (!res.ok) {
    const err = data && data.error;
    if (res.status === 401 && token) {
      // ตั๋วหมดอายุหรือไม่ถูกต้อง: ล้างทิ้งแล้วบอกส่วนอื่นของเว็บ
      clearToken();
      window.dispatchEvent(new Event("auth-expired"));
    }
    throw new ApiError(res.status, (err && err.code) || "ERROR", (err && err.message) || "เกิดข้อผิดพลาด");
  }
  return data;
}

// วันที่ปัจจุบันตามเวลาไทย รูปแบบ YYYY-MM-DD (ใช้เป็นค่าต่ำสุดของช่องเลือกวัน)
export function todayStr() {
  return new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10);
}
