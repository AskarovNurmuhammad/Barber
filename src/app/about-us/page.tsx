"use client";
import React from "react";
import Navbar from "../navbar/page";
import Footer from "../footer/page";

const About = () => {
  return (
    <div className="relative min-h-screen text-white bg-black">
      <div className="relative w-full h-[100vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/bgbarber2.png')` }}
        />
        <div className="absolute inset-0 bg-black opacity-60 z-10" />
        <div className="relative z-20">
          <Navbar />
        </div>
        <div className="relative z-30 flex flex-col items-center justify-center h-[600px] text-center">
          <h1 className="text-6xl font-bold tracking-widest">ABOUT US</h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Discover the story behind our craft and dedication to classic
            grooming.
          </p>
        </div>
      </div>

      <section className="px-4 md:px-20 py-20 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            At our barbershop, tradition meets modern style. Our team of
            professional barbers offers exceptional grooming services in a
            stylish and welcoming environment. Whether you’re looking for a
            classic cut or a trendy new look, we’ve got you covered. We believe
            in precision, passion, and delivering the best customer experience.
          </p>
        </div>
      </section>

      <section className="bg-black text-center py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl italic text-gray-300">
            “A great haircut isn’t just about looking good, it’s about feeling
            confident and refreshed.”
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
