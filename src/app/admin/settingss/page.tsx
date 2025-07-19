"use client";
import { supabase } from "@/app/supabaseClient";
import React, { useState, useEffect } from "react";

import ClipLoader from "react-spinners/ClipLoader";

const AdminSettings = () => {
  const [shopName, setShopName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [bookingInterval, setBookingInterval] = useState("");
  const [enableOnlinePayment, setEnableOnlinePayment] = useState(false);
  const [currency, setCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .single();
      setIsLoading(false);
      if (error) {
        console.log(error);
      } else if (data) {
        setShopName(data.name || "");
        setPhoneNumber(data.phone || "");
        setLocation(data.location || "");
        setBookingInterval(data.booking_interval || "");
        setEnableOnlinePayment(data.online_payment || false);
        setCurrency(data.currency || "");
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    const { data: existingInfo, error: fetchError } = await supabase
      .from("settings")
      .select("*")
      .single();

    if (fetchError) {
      console.log(fetchError.message);
      return;
    }

    if (existingInfo) {
      await supabase
        .from("settings")
        .update({
          name: shopName,
          phone: phoneNumber,
          location,
          booking_interval: bookingInterval,
          online_payment: enableOnlinePayment,
          currency,
        })
        .eq("id", existingInfo.id);
    } else {
      await supabase.from("settings").insert([
        {
          name: shopName,
          phone: phoneNumber,
          location,
          booking_interval: bookingInterval,
          online_payment: enableOnlinePayment,
          currency,
        },
      ]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[700px]">
        <ClipLoader size={50} color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Shop Info */}
      <div className="bg-white p-4 shadow rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Barber Shop Info</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Phone number"
            className="border p-2 w-full"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="border p-2 w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {/* Booking Settings */}
      <div className="bg-white p-4 shadow rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Booking Settings</h2>
        <div className="space-y-2">
          <select
            className="border p-2 w-full"
            value={bookingInterval}
            onChange={(e) => setBookingInterval(e.target.value)}
          >
            <option value="">Booking interval</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
          </select>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white p-4 shadow rounded-xl mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Settings</h2>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={enableOnlinePayment}
              onChange={(e) => setEnableOnlinePayment(e.target.checked)}
            />
            <span>Enable online payment</span>
          </label>
          <select
            className="border p-2 w-full"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="">Select a currency</option>
            <option value="UZS">UZS</option>
            <option value="USD">USD</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
};

export default AdminSettings;
