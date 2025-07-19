"use client";
import Footer from "@/app/footer/page";
import Navbar from "@/app/navbar/page";
import { supabase } from "@/app/supabaseClient";
import { useUser } from "@clerk/nextjs";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
interface Service {
  id: number;
  name: string;
  category: string;
  price: string;
}

interface Barber {
  id: number;
  name: string;
  time: string;
  skills: string[];
}
interface Appointment {
  time: string;
}
const locations = ["Mustaqillik", "Piridastgir", "Alpomish"];

const AppointmentPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedBarberId, setSelectedBarberId] = useState<number | null>(null);
  const [selectedLocationIndex, setSelectedLocationIndex] = useState<
    number | null
  >(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const { user } = useUser();
  const appointmentRef = useRef<HTMLDivElement>(null);

  function scrollToAppointment() {
    appointmentRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: servicesData } = await supabase
        .from("services")
        .select("*");
      const { data: barbersData } = await supabase.from("masters").select("*");
      if (servicesData) setServices(servicesData);
      if (barbersData) setBarbers(barbersData);
      setLoading(false);
    };
    async function getTime() {
      const { data, error } = await supabase
        .from("appointments")
        .select("time")
        .eq("user_id", user?.id);
      console.log(data);

      if (error) {
        console.log(error.message);
      }
      setAppointments(data || []);
    }

    getTime();
    fetchData();
  }, []);

  async function handleSubmit() {
    const selectedBarberName = barbers.find(
      (b) => b.id === selectedBarberId
    )?.name;
    setLoading(true);
    const { error } = await supabase.from("appointments").insert([
      {
        full_name: fullName,
        phone,
        email,
        location: locations[selectedLocationIndex!],
        services: selectedServiceNames,
        date: selectedDate,
        time: selectedTime,
        barber: selectedBarberName,
        user_id: user?.id,
      },
    ]);

    if (error) {
      console.error("Error inserting appointment:", error);
      toast.error("Failed to book appointment.");
    } else {
      toast.success("Appointment booked successfully!");
      setFullName("");
      setPhone("");
      setEmail("");
      setSelectedDate("");
      setSelectedTime("");
      setSelectedBarberId(null);
      setSelectedLocationIndex(null);
      setSelectedServices([]);
    }
    setLoading(false);
  }
  const selectedServiceNames = services
    .filter((service) => selectedServices.includes(service.id))
    .map((service) => service.name.toLowerCase());

  const filteredBarbers = barbers.filter((barber) => {
    const barberSkills = (barber.skills || []).map((s) => s.toLowerCase());
    return selectedServiceNames.every((selected) =>
      barberSkills.includes(selected)
    );
  });
  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="flex flex-col items-center gap-4">
  //         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  //         <p className="text-lg text-gray-600">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }
  // logic for input date
  const today = new Date();
  const minDate = today.toISOString().split("T")[0];

  const maxDateObj = new Date(today);
  maxDateObj.setDate(today.getDate() + 2);
  const maxDate = maxDateObj.toISOString().split("T")[0];
  // logic for input date

  // logic for input time
  function handleTime(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    const [hour, minute] = value.split(":").map(Number);
    const takenTimes = appointments.map((a) => a.time.slice(0, 5));
    console.log(takenTimes);

    if (hour < 9 || hour > 20 || (hour === 20 && minute > 0)) {
      alert("Please choose time according to the business hours !");
      return;
    }
    if (takenTimes.includes(value)) {
      alert("This time is already booked. Please choose another time.");
      return;
    }
    setSelectedTime(value);
  }
  // logic for input time

  return (
    <div className="relative min-h-screen text-white">
      {/* Background image */}

      <div className="relative w-full h-[100vh]">
        <div
          className="absolute inset-0 bg-cover bg-center "
          style={{ backgroundImage: `url(/appointment.png)` }}
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />

        {/* Navbar */}
        <div className="relative z-30">
          <Navbar />
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center h-[600px] text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wide">
            Appointment
          </h1>
          <div className="mt-4 text-sm md:text-base">
            <Link className="hover:text-[#c8865c] mx-1" href="/">
              Home
            </Link>
            / <span className="mx-1">Appointment</span>
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
      </div>
      {/* Appointment */}
      <div ref={appointmentRef} className="bg-black text-white py-16 px-4">
        <span className="uppercase text-white font-semibold text-md ml-2">
          Make an appointment
        </span>
        <div className="mt-7 flex flex-col lg:flex-row gap-10 px-4 lg:px-10">
          <div className="flex flex-col gap-10 lg:w-1/2">
            <h1 className="uppercase text-4xl lg:text-6xl font-bold max-w-full lg:max-w-sm">
              Reserve your spot, pamper yourself
            </h1>
            <p className="max-w-full lg:max-w-xl">
              Whether you’re looking for a precise haircut, a luxurious shave,
              or expert beard grooming, our team is here to craft the perfect
              style just for you. Secure your spot today and experience the
              difference!
            </p>
            {/* Hours */}
            <div className="flex flex-col gap-5">
              <h1 className="uppercase text-2xl lg:text-3xl font-bold">
                Business hours
              </h1>

              <div>
                <span className="font-normal">Mon - Fri:</span>
                <div className="w-full lg:w-[350px]">
                  <h1 className="text-3xl lg:text-4xl font-bold border-b border-gray-700 pb-3 lg:pb-5">
                    9AM - 8PM
                  </h1>
                </div>
              </div>
              <div>
                <span className="font-normal">Sat:</span>
                <div className="w-full lg:w-[350px]">
                  <h1 className="text-3xl lg:text-4xl font-bold border-b border-gray-700 pb-3 lg:pb-5">
                    9AM - 6PM
                  </h1>
                </div>
              </div>
              <div>
                <span className="font-normal">Sun:</span>
                <div className="w-full lg:w-[350px]">
                  <h1 className="text-3xl lg:text-4xl font-bold border-b border-gray-700 pb-3 lg:pb-5">
                    10AM - 5PM
                  </h1>
                </div>
              </div>
            </div>

            <div>
              <h1 className="uppercase text-2xl lg:text-3xl font-bold">
                Booking number
              </h1>
              <p className="text-[#c8865c] text-2xl lg:text-3xl font-bold mt-3">
                +9998001234567
              </p>
            </div>
          </div>

          <div className="bg-[#121212] text-white py-10 px-4 md:px-6 lg:px-10 w-full lg:w-1/2">
            <h1 className="text-3xl lg:text-4xl font-bold mb-8">
              BOOK AN APPOINTMENT
            </h1>
            <ToastContainer />
            {/* LOCATIONS */}
            <div className="mb-10">
              <h2 className="text-lg lg:text-xl font-bold mb-4">
                OUR LOCATIONS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedLocationIndex(index)}
                    className={`p-4 border cursor-pointer transition-all duration-200 ${
                      selectedLocationIndex === index
                        ? "bg-[#c8865c] text-black border-none"
                        : "border-gray-700 hover:border-[#c8865c]"
                    }`}
                  >
                    <p>{location}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SERVICES */}
            <div className="mb-10">
              <h2 className="text-lg lg:text-xl font-bold mb-4">
                PREFERRED SERVICE
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      required
                      type="checkbox"
                      className="form-checkbox text-[#c8865c]"
                      checked={selectedServices.includes(service.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedServices([
                            ...selectedServices,
                            service.id,
                          ]);
                        } else {
                          setSelectedServices(
                            selectedServices.filter((id) => id !== service.id)
                          );
                        }
                      }}
                    />
                    <p className="flex gap-5 items-center">
                      {service.name}
                      <span className="text-sm text-[#c8865c]">
                        ({service.price}$)
                      </span>
                    </p>
                  </label>
                ))}
              </div>
            </div>

            {/* TIME */}
            <div className="mb-10">
              <h2 className="text-lg lg:text-xl font-bold mb-4">
                SELECT YOUR TIME
              </h2>
              <p>Please choose according to the masters time !</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label>
                  <input
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={minDate}
                    max={maxDate}
                    type="date"
                    className="bg-[#c8865c] text-white border border-gray-700 p-3 rounded w-full"
                  />
                </label>
                <input
                  required
                  value={selectedTime}
                  onChange={handleTime}
                  type="time"
                  min="09:00"
                  max="20:00"
                  step="60"
                  className="bg-[#c8865c] text-white border border-gray-700 p-3 rounded w-full"
                />
              </div>
            </div>

            {/* BARBER SELECT */}
            <div className="mb-10">
              <h2 className="text-lg lg:text-xl font-bold mb-4">
                PREFERRED BARBER
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(selectedServiceNames.length > 0
                  ? filteredBarbers
                  : barbers
                ).map((barber) => (
                  <div
                    key={barber.id}
                    onClick={() => setSelectedBarberId(barber.id)}
                    className={`text-center p-2 rounded cursor-pointer transition-all duration-200 ${
                      selectedBarberId === barber.id
                        ? "border-4 border-[#c8865c] bg-black"
                        : "border border-gray-700 hover:border-[#c8865c]"
                    }`}
                  >
                    <img
                      src="/master1.png"
                      alt={barber.name}
                      className="w-full h-40 object-cover rounded"
                    />
                    <p className="mt-2 font-semibold">{barber.name}</p>
                    <p>{barber.time}</p>
                  </div>
                ))}
              </div>
              {!selectedBarberId && (
                <p className="text-sm text-red-400 mt-2">
                  Please choose master!
                </p>
              )}
            </div>

            {/* USER INFO */}
            <div className="mb-10">
              <h2 className="text-lg lg:text-xl font-bold mb-4">
                YOUR DETAILS
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  placeholder="Your Full Name *"
                  className="bg-black text-white border border-gray-700 p-3 rounded w-full"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="Phone Number *"
                  className="bg-black text-white border border-gray-700 p-3 rounded w-full"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email Address *"
                  className="bg-black text-white border border-gray-700 p-3 rounded w-full md:col-span-2"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="text-center">
              {loading ? (
                <button
                  disabled
                  onClick={handleSubmit}
                  className="bg-[#c8865c] text-white font-bold px-8 py-3 rounded hover:opacity-90 transition-all"
                >
                  Loading...
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-[#c8865c] text-white font-bold px-8 py-3 rounded hover:opacity-90 transition-all"
                >
                  SUBMIT →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentPage;
