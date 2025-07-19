"use client";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { FiHome, FiUser, FiScissors } from "react-icons/fi";
import "react-tooltip/dist/react-tooltip.css";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { FaCalendarCheck } from "react-icons/fa";
const Navbar = () => {
  const [phone, setPhone] = useState("");
  const [activeLink, setActiveLink] = useState<string>("home");
  console.log(activeLink);
  const { user } = useUser();
  const pathname = usePathname();
  useEffect(() => {
    getPhone();
  }, []);

  async function getPhone() {
    const { data } = await supabase.from("settings").select("phone").single();
    const phone = data?.phone;
    setPhone(phone);
  }

  return (
    <>
      <div className="hidden lg:flex justify-between items-center px-10 text-white relative z-100 border-b border-white pb-4">
        <div className="flex items-center mt-3">
          <img className="w-25" src="/barberWhite.png" alt="logo" />
          <h1 className="text-3xl">Trimly</h1>
        </div>
        <div className="pt-3 flex items-center gap-7">
          <ul className="flex items-center gap-7">
            <li>
              <Link
                href="/"
                className={`hover:text-[#c8865c] transition-colors ${
                  pathname === "/" ? "text-[#c8865c]" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/masters"
                className={`hover:text-[#c8865c] transition-colors ${
                  pathname === "/masters" ? "text-[#c8865c]" : ""
                }`}
              >
                Masters
              </Link>
            </li>
            <li>
              <Link
                href="/servicess"
                className={`hover:text-[#c8865c] transition-colors ${
                  pathname === "/servicess" ? "text-[#c8865c]" : ""
                }`}
                onClick={() => setActiveLink("services")}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className={`hover:text-[#c8865c] transition-colors ${
                  pathname === "/about-us" ? "text-[#c8865c]" : ""
                }`}
                onClick={() => setActiveLink("about-us")}
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/books"
                className={`hover:text-[#c8865c] transition-colors ${
                  pathname === "/books" ? "text-[#c8865c]" : ""
                }`}
                onClick={() => setActiveLink("books")}
              >
                My bookings
              </Link>
            </li>
          </ul>
        </div>
        <div className="pt-1.5 flex items-center gap-4">
          <span>Phone : {phone}</span>
          <div className="flex items-center gap-5">
            <ClerkProvider>
              <SignedOut>
                <Link href="/sign-in">
                  <div
                    data-tooltip-id="login-tooltip"
                    data-tooltip-content="Login"
                    className="cursor-pointer"
                  >
                    <LogIn size={24} />
                  </div>
                </Link>
                <Tooltip
                  id="login-tooltip"
                  place="bottom"
                  className="text-xs px-2 py-1 text-black border border-gray-300 shadow"
                  style={{
                    fontSize: "12px",
                    backgroundColor: "#fff",
                    color: "#000",
                  }}
                />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </ClerkProvider>
            <Link
              href={user ? `/appointment/${user.id}` : "/sign-in"}
              className="p-3 px-4 bg-[#c8865c] text-white flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-[#b4744e]"
            >
              Book a visit <ArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobil navbar */}
      <div className="lg:hidden fixed bottom-0 w-full h-20 bg-[#c8865c] text-white flex justify-around items-center py-2 z-50">
        <Link
          href="/"
          className={`transition-transform ${
            pathname === "/" ? "scale-125 text-white" : "text-white/70"
          }`}
          onClick={() => setActiveLink("home")}
        >
          <FiHome size={24} />
        </Link>
        <Link
          href="/masters"
          className={`transition-transform ${
            pathname === "/masters" ? "scale-125 text-white" : "text-white/70"
          }`}
          onClick={() => setActiveLink("masters")}
        >
          <FiUser size={24} />
        </Link>
        <Link
          href="/servicess"
          className={`transition-transform ${
            pathname === "/servicess" ? "scale-125 text-white" : "text-white/70"
          }`}
          onClick={() => setActiveLink("servicess")}
        >
          <FiScissors size={24} />
        </Link>
        <Link
          href="/books"
          className={`transition-transform ${
            pathname === "/books" ? "scale-125 text-white" : "text-white/70"
          }`}
          onClick={() => setActiveLink("books")}
        >
          <FaCalendarCheck size={24} />
        </Link>
        <ClerkProvider>
          <SignedOut>
            <Link href="/sign-in">
              <div
                data-tooltip-id="login-tooltip"
                data-tooltip-content="Login"
                className="cursor-pointer"
              >
                <LogIn size={24} />
              </div>
            </Link>
            <Tooltip
              id="login-tooltip"
              place="bottom"
              className="text-xs px-2 py-1 text-black border border-gray-300 shadow"
              style={{
                fontSize: "12px",
                backgroundColor: "#fff",
                color: "#000",
              }}
            />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ClerkProvider>
      </div>
    </>
  );
};

export default Navbar;
