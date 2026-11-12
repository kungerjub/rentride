import { Link } from "react-router-dom";

function CarCard({ car }) {
  const typeLabel = car.type === "motorcycle" ? "มอเตอร์ไซค์" : "รถยนต์";
  const image = car.image_url || "https://placehold.co/600x350?text=No+Image";

  return (
    <Link to={`/cars/${car.id}`} className="car-card car-card-link">
      <img src={image} alt={`${car.brand} ${car.model}`} />
      <h3>
        {car.brand} {car.model}
      </h3>
      <p>
        {typeLabel}
        {car.seats ? ` · ${car.seats} ที่นั่ง` : ""}
      </p>
      <h3>{Number(car.price_per_day).toLocaleString("th-TH")} บาท / วัน</h3>
    </Link>
  );
}

export default CarCard;
