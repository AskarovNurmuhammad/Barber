"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../navbar/page";
import { supabase } from "../supabaseClient";
import { useUser } from "@clerk/nextjs";
import { ArrowDown } from "lucide-react";
import Footer from "../footer/page";
import Link from "next/link";

interface Appointment {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  location: string;
  services: string[];
  date: string;
  time: string;
  barber: string;
  created_at: string;
}

const Bookings = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const appointmentRef = useRef<HTMLDivElement>(null);

  function scrollToAppointment() {
    appointmentRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (!user?.id) return;

    const fetchData = async () => {
      setLoading(true);
      const { data: appointmentData, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error(error.message);
      }

      if (appointmentData) setAppointments(appointmentData);
      setLoading(false);
    };

    fetchData();
  }, [user?.id]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen  text-white">
      {/* Hero Section */}

      <div className="relative w-full h-[100vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/booking.png)` }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <div className="relative z-30">
          <Navbar />
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Your Bookings
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-300">
            Below are all your current and past bookings
          </p>
          <div className="mt-6">
            <Link
              href={user ? `/appointment/${user.id}` : "/sign-in"}
              className="w-full lg:w-auto bg-[#c18f61] text-white px-6 py-3 rounded uppercase text-sm font-semibold hover:bg-[#a5744b] transition flex items-center justify-center gap-2"
            >
              Book an Appointment →
            </Link>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-25 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
        onClick={scrollToAppointment}
      >
        <div className="text-white text-3xl animate-bounce">
          <h1>
            <ArrowDown />
          </h1>
        </div>
      </div>
      {/* Appointment List */}
      <div ref={appointmentRef} className="py-16 px-4 md:px-10">
        {appointments.length === 0 ? (
          <p className="text-center text-lg text-red-500">
            You have no appointments booked yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-[#1a1a1a] rounded-lg p-6 shadow-md border border-gray-800 hover:border-[#c8865c] transition"
              >
                <h2 className="text-xl font-bold mb-2 text-[#c8865c]">
                  {appointment.full_name}
                </h2>
                <p className="text-sm text-gray-300 mb-1">
                  📍 Location: {appointment.location}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  📞 Phone: {appointment.phone}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  📧 Email: {appointment.email}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  🧔‍♂️ Barber: {appointment.barber}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  🗓️ Date: {appointment.date}
                </p>
                <p className="text-sm text-gray-300 mb-3">
                  ⏰ Time: {appointment.time}
                </p>
                <div>
                  <p className="font-semibold mb-1">🛠 Services:</p>
                  <ul className="list-disc list-inside text-sm text-gray-300">
                    {appointment.services.map((srv, idx) => (
                      <li key={idx}>{srv}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Bookings;
