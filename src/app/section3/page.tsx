"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Section3() {
  const { user } = useUser();
  return (
    <section className="bg-[#111] text-white px-6 md:px-20 py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 uppercase">
        Make an Appointment
      </h2>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative w-full h-[300px] md:h-[400px]">
          <Image
            src="/barber-tools.png"
            alt="Barber Tools"
            fill
            className="object-cover rounded"
          />
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded flex flex-col lg:flex-row gap-10">
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-10">
              <div>
                <h3 className="text-lg font-bold text-white uppercase mb-1">
                  Our Location
                </h3>
                <p className="text-gray-300">
                  2972 Westheimer Rd.
                  <br />
                  Santa Ana, Illinois 85486
                </p>
                <p className="text-gray-500 mt-1 text-sm">Walk-Ins Welcome</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white uppercase mb-1">
                  Booking Number
                </h3>
                <p className="text-orange-400 text-xl font-semibold">
                  +(084) 123 - 456 88
                </p>
              </div>

              <div className="lg:hidden">
                <h3 className="text-lg font-bold text-white uppercase mb-2">
                  Business Hours
                </h3>
                <div className="text-gray-300 space-y-1">
                  <p>
                    <span className="inline-block w-16 font-medium">
                      Mon–Fri:
                    </span>
                    <span className="font-bold text-white">9AM – 8PM</span>
                  </p>
                  <p>
                    <span className="inline-block w-16 font-medium">Sat:</span>
                    <span className="font-bold text-white">9AM – 6PM</span>
                  </p>
                  <p>
                    <span className="inline-block w-16 font-medium">Sun:</span>
                    <span className="font-bold text-white">10AM – 5PM</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href={user ? `/appointment/${user.id}` : "/sign-in"}
                className="w-full lg:w-auto bg-[#c18f61] text-white px-6 py-3 rounded uppercase text-sm font-semibold hover:bg-[#a5744b] transition flex items-center justify-center gap-2"
              >
                Book an Appointment →
              </Link>
            </div>
          </div>

          <div className="hidden lg:block min-w-[200px]">
            <h3 className="text-lg font-bold text-white uppercase mb-2">
              Business Hours
            </h3>
            <div className="text-gray-300 space-y-1">
              <p>
                <span className="inline-block w-16 font-medium">Mon–Fri:</span>
                <span className="font-bold text-white">9AM – 8PM</span>
              </p>
              <p>
                <span className="inline-block w-16 font-medium">Sat:</span>
                <span className="font-bold text-white">9AM – 6PM</span>
              </p>
              <p>
                <span className="inline-block w-16 font-medium">Sun:</span>
                <span className="font-bold text-white">10AM – 5PM</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
