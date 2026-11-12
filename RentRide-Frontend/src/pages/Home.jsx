import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import CarCard from "../components/CarCard";

function Home() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/cars")
      .then((data) => setCars(data.items.slice(0, 3)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>
            ค้นหารถที่ใช่
            <br />
            สำหรับการเดินทางของคุณ
          </h1>

          <p>RentRide บริการเช่ารถง่าย ๆ เลือกรถที่คุณต้องการได้ในที่เดียว</p>

          <Link to="/cars" className="hero-btn">
            เลือกรถเลย
          </Link>
        </div>
      </section>

      <section className="cars-section">
        <h2>รถแนะนำ</h2>
        <p>เลือกรถที่เหมาะกับการเดินทางของคุณ</p>

        {error && <p className="form-error">{error}</p>}

        <div className="car-list">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
