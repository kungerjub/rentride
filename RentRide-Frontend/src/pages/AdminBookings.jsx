import { useCallback, useEffect, useState } from "react";
import { api } from "../api";
import StatusBadge from "../components/StatusBadge";

// ปุ่มที่แสดงตามสถานะปัจจุบัน: [สถานะใหม่, ข้อความบนปุ่ม] (ตรงกับลำดับที่ Backend อนุญาต)
const ACTIONS = {
  pending: [
    ["approved", "อนุมัติ"],
    ["cancelled", "ปฏิเสธ"],
  ],
  approved: [
    ["picked_up", "ส่งมอบรถ"],
    ["cancelled", "ยกเลิก"],
  ],
  picked_up: [["returned", "รับรถคืน"]],
};

function AdminBookings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(() => {
    api("/api/admin/bookings")
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

  async function changeStatus(id, status) {
    setBusyId(id);
    try {
      await api(`/api/admin/bookings/${id}/status`, { method: "PUT", body: { status } });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="page">
      <h1>จัดการการจองทั้งหมด</h1>

      {error && <p className="form-error">{error}</p>}
      {loading && <p className="page-msg">กำลังโหลด...</p>}
      {!loading && !error && items.length === 0 && <p className="page-msg">ยังไม่มีการจอง</p>}

      {items.length > 0 && (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ผู้จอง</th>
                <th>รถ</th>
                <th>วันรับ - วันคืน</th>
                <th>ราคารวม</th>
                <th>สถานะ</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {items.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>
                    {b.user_name}
                    <br />
                    <span className="muted">{b.user_email}</span>
                  </td>
                  <td>{b.car_name}</td>
                  <td>
                    {b.start_date} ถึง {b.end_date}
                  </td>
                  <td>{Number(b.total_price).toLocaleString("th-TH")} บาท</td>
                  <td>
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="actions">
                    {(ACTIONS[b.status] || []).map(([next, label]) => (
                      <button
                        key={next}
                        className={next === "cancelled" ? "btn btn-danger btn-small" : "btn btn-small"}
                        disabled={busyId === b.id}
                        onClick={() => changeStatus(b.id, next)}
                      >
                        {label}
                      </button>
                    ))}
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

export default AdminBookings;
