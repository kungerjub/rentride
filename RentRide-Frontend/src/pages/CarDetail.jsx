import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { api, todayStr } from "../api";

function CarDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api(`/api/cars/${id}`)
      .then(setCar)
      .catch((err) => setLoadError(err.message));
  }, [id]);

  if (loadError) return <p className="page-msg">{loadError}</p>;
  if (!car) return <p className="page-msg">กำลังโหลด...</p>;

  const typeLabel = car.type === "motorcycle" ? "มอเตอร์ไซค์" : "รถยนต์";
  const available = car.status === "available";
  // นับรวมทั้งวันรับและวันคืน (ตรงกับที่ Backend คำนวณ)
  const days = start && end && end >= start ? Math.round((new Date(end) - new Date(start)) / 86400000) + 1 : 0;
  const total = days * car.price_per_day;

  async function handleBook(e) {
    e.preventDefault();
    if (!user) {
      navigate("/login", { state: { from: `/cars/${id}` } });
      return;
    }
    setError("");
    setBusy(true);
    try {
      await api("/api/bookings", {
        method: "POST",
        body: { car_id: car.id, start_date: start, end_date: end },
      });
      navigate("/my-bookings");
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <div className="car-detail">
        <img
          src={car.image_url || "https://placehold.co/600x350?text=No+Image"}
          alt={`${car.brand} ${car.model}`}
        />

        <div>
          <h1>
            {car.brand} {car.model}
          </h1>
          <p className="muted">
            {typeLabel}
            {car.seats ? ` · ${car.seats} ที่นั่ง` : ""}
          </p>
          <h2 className="price">{Number(car.price_per_day).toLocaleString("th-TH")} บาท / วัน</h2>

          {!available ? (
            <p className="form-error">รถคันนี้ไม่พร้อมให้เช่าในขณะนี้</p>
          ) : (
            <form className="booking-form" onSubmit={handleBook}>
              <h3>จองรถคันนี้</h3>
              <div className="form-group">
                <label htmlFor="start">วันรับรถ</label>
                <input
                  id="start"
                  type="date"
                  min={todayStr()}
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="end">วันคืนรถ</label>
                <input
                  id="end"
                  type="date"
                  min={start || todayStr()}
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  required
                />
              </div>

              {days > 0 && (
                <p className="summary">
                  {days} วัน รวม <strong>{total.toLocaleString("th-TH")} บาท</strong>
                </p>
              )}
              {error && <p className="form-error">{error}</p>}

              <button className="btn" type="submit" disabled={busy}>
                {busy ? "กำลังจอง..." : user ? "ยืนยันการจอง" : "เข้าสู่ระบบเพื่อจอง"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarDetail;
