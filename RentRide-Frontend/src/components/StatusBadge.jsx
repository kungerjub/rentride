const LABELS = {
  pending: "รออนุมัติ",
  approved: "อนุมัติแล้ว",
  picked_up: "รับรถแล้ว",
  returned: "คืนรถแล้ว",
  cancelled: "ยกเลิก",
};

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{LABELS[status] || status}</span>;
}

export default StatusBadge;
