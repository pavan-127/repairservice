import {  useNavigate } from "react-router-dom";

const services = [
  
  { name: "Repair Phone", image: "src/assets/Repair1.avif" },
  // { name: "Buy Laptop", image: "src/assets/Laptop1.jpg" },
  // { name: "Screen Damage", image: "src/assets/Screen1.webp" },
  // { name: "Battery Issue", image: "src/assets/Battery1.jpeg" },
  
];

export default function HomePage() {

  const navigate = useNavigate();
  return (
    <>
    <div className="font-sans">
      {/* Banner */}
      <section className="bg-black text-white p-8 text-center">
        <h2 className="text-3xl font-bold">Refer & Earn 100Rs Cashback On Display And Motherboard Repair</h2>
       
       <button
      className="mt-4 bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-100"
      onClick={() => navigate("book-repair")}
    >
      Book Repair
    </button>   
        <p className="text-sm mt-2">*Min order value ₹1,000</p>
      </section>

      {/* Services */}
      <section className="py-10 px-4 bg-gray-100">
        <h3 className="text-2xl font-semibold mb-6 text-center">Our Services</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
          {services.map((service, index) => (
            <div key={index} className="text-center">
              <img src={service.image} alt={service.name} className="w-20 h-20 mx-auto mb-2" />
              <p>{service.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
