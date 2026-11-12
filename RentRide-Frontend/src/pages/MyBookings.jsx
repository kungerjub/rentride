import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import StatusBadge from "../components/StatusBadge";

function MyBookings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    api("/api/me/bookings")
      .then((data) => {
        setItems(data.items);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleCancel(id) {
    if (!window.confirm("ต้องการยกเลิกการจองนี้ใช่ไหม")) return;
    try {
      await api(`/api/bookings/${id}/cancel`, { method: "PUT" });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <h1>การจองของฉัน</h1>

      {error && <p className="form-error">{error}</p>}
      {loading && <p className="page-msg">กำลังโหลด...</p>}
      {!loading && !error && items.length === 0 && (
        <p className="page-msg">
          ยังไม่มีการจอง <Link to="/cars">ไปเลือกรถเลย</Link>
        </p>
      )}

      {items.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>รถ</th>
                <th>วันรับ</th>
                <th>วันคืน</th>
                <th>ราคารวม</th>
                <th>สถานะ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.id}>
                  <td>{b.car_name}</td>
                  <td>{b.start_date}</td>
                  <td>{b.end_date}</td>
                  <td>{Number(b.total_price).toLocaleString("th-TH")} บาท</td>
                  <td>
                    <StatusBadge status={b.status} />
                  </td>
                  <td>
                    {(b.status === "pending" || b.status === "approved") && (
                      <button className="btn btn-danger btn-small" onClick={() => handleCancel(b.id)}>
                        ยกเลิก
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
