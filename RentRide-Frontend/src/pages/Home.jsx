
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <h1>
            ค้นหารถที่ใช่
            <br />
            สำหรับการเดินทางของคุณ
          </h1>

          <p>
            RentRide บริการเช่ารถง่าย ๆ
            เลือกรถที่คุณต้องการได้ในที่เดียว
          </p>

          <a href="#cars" className="hero-btn">
            เลือกรถเลย
          </a>
        </div>
      </section>

      <section className="cars-section" id="cars">
        <h2>รถแนะนำ</h2>
        <p>เลือกรถที่เหมาะกับการเดินทางของคุณ</p>

        <div className="car-list">
          <div className="car-card">
            <img
              src="https://placehold.co/600x350?text=Toyota+Yaris"
              alt="Toyota Yaris"
            />
            <h3>Toyota Yaris</h3>
            <p>รถยนต์ · 5 ที่นั่ง</p>
            <h3>1,000 บาท / วัน</h3>
          </div>

          <div className="car-card">
            <img
              src="https://placehold.co/600x350?text=Honda+City"
              alt="Honda City"
            />
            <h3>Honda City</h3>
            <p>รถยนต์ · 5 ที่นั่ง</p>
            <h3>1,200 บาท / วัน</h3>
          </div>

          <div className="car-card">
            <img
              src="https://placehold.co/600x350?text=Honda+Click"
              alt="Honda Click 160"
            />
            <h3>Honda Click 160</h3>
            <p>มอเตอร์ไซค์</p>
            <h3>300 บาท / วัน</h3>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
