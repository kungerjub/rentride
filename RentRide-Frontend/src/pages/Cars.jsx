import { useEffect, useState } from "react";
import { api } from "../api";
import CarCard from "../components/CarCard";

function Cars() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // พิมพ์ค้นหาแล้วรอ 0.3 วินาทีค่อยเรียก API เพื่อไม่ให้ยิงทุกตัวอักษร
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (type) params.set("type", type);

      setLoading(true);
      api(`/api/cars?${params}`)
        .then((data) => {
          setCars(data.items);
          setError("");
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [q, type]);

  return (
    <section className="cars-section">
      <h2>รถทั้งหมด</h2>
      <p>ค้นหาและเลือกรถที่ต้องการเช่า</p>

      <div className="filters">
        <input
          type="search"
          placeholder="ค้นหายี่ห้อหรือรุ่น เช่น Honda"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">ทุกประเภท</option>
          <option value="car">รถยนต์</option>
          <option value="motorcycle">มอเตอร์ไซค์</option>
        </select>
      </div>

      {error && <p className="form-error">{error}</p>}
      {loading && <p className="page-msg">กำลังโหลด...</p>}
      {!loading && !error && cars.length === 0 && <p className="page-msg">ไม่พบรถที่ตรงกับการค้นหา</p>}

      <div className="car-list">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}

export default Cars;
