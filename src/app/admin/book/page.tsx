"use client";
import { supabase } from "@/app/supabaseClient";
import React, { useEffect, useState } from "react";
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
const AdminBook = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data: appointmentData, error } = await supabase
        .from("appointments")
        .select("*");
      if (error) {
        console.error(error.message);
      }

      if (appointmentData) setAppointments(appointmentData);
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="py-16 px-4 md:px-10">
        {appointments.length === 0 ? (
          <p className="text-center text-lg text-gray-400">
            No appointments booked yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-blue-500 rounded-lg p-6 shadow-md hover:border-[#c8865c] transition"
              >
                <h2 className="text-xl font-bold mb-2 text-white">
                  Full Name : {appointment.full_name}
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
                  <p className="font-semibold mb-1 text-white">🛠 Services:</p>
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
    </div>
  );
};

export default AdminBook;
