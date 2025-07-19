"use client";

import { useState } from "react";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "HAIRCUT",
    desc: "Preserving the service and comfort of the old fashioned barbershop experience.",
    img: "/haircut.png",
  },
  {
    id: 2,
    title: "ROYAL SHAVING",
    desc: "Enjoy a traditional royal shave with hot towels and precision blades.",
    img: "/shaving.png",
  },
  {
    id: 3,
    title: "BEARD STYLING",
    desc: "Tailored beard shaping and trimming to suit your style.",
    img: "/beard-style.png",
  },
  {
    id: 4,
    title: "BARBER-SPA",
    desc: "Relax with a rejuvenating scalp massage and grooming treatment.",
    img: "/barber-spa.png",
  },
];

export default function Section2() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-[#111] text-white px-6 md:px-20 py-16">
      <h2 className="text-2xl font-bold mb-10">
        A RANGE OF PREMIUM BARBER SERVICES
      </h2>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="w-full h-[300px] md:h-[400px] relative mb-4">
            <Image
              src={services[active].img}
              alt={services[active].title}
              fill
              className="object-cover rounded"
            />
          </div>
          <p className="text-gray-400">{services[active].desc}</p>
        </div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => setActive(index)}
              className={`group block w-full text-left py-4 transition-all duration-300 ${
                index === active
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h2 className="font-extrabold text-4xl md:text-5xl tracking-tight">
                  {service.title}
                </h2>
                <span className="text-orange-500 text-sm md:text-base">
                  [{String(service.id).padStart(2, "0")}]
                </span>
              </div>
              <div
                className={`mt-2 h-[2px] transition-all duration-300 ${
                  index === active
                    ? "bg-white w-full opacity-100"
                    : "bg-gray-500 w-1/4 group-hover:w-full opacity-30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
