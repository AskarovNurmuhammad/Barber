"use client";

import { supabase } from "@/app/supabaseClient";
import { Delete, Edit } from "lucide-react";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Service {
  id: number;
  name: string;
  category: string;
  time: string;
  price: string;
}
const AdminServices = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  useEffect(() => {
    getServices();
  }, []);
  useEffect(() => {
    if (!isOpen) {
      setSelectedService(null);
    }
  }, []);
  const filteredServices = services.filter((itm) =>
    itm.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  async function handleSave() {
    setIsLoading(true);
    if (selectedService) {
      await supabase
        .from("services")
        .update({ name, time, price, category })
        .eq("id", selectedService.id);
    } else {
      await supabase.from("services").insert([{ name, time, price, category }]);
    }
    setIsLoading(false);
    setIsOpen(false);
    await getServices();
  }
  async function getServices() {
    setIsLoading(true);

    const { data } = await supabase.from("services").select("*");
    setServices(data || []);
    setIsLoading(false);
  }
  function handleEdit(service: Service) {
    setSelectedService(service);
    setName(service.name);
    setCategory(service.category);
    setTime(service.time);
    setPrice(service.price);
    setIsOpen(true);
  }
  async function handleDelete(id: number) {
    await supabase.from("services").delete().eq("id", id);
    getServices();
  }
  return (
    <div className="flex flex-col gap-20">
      <h1 className="text-3xl">Services</h1>
      <div className="flex items-center gap-2 justify-around">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search by name ..."
          className="bg-gray-100 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 px-2 py-1 w-[300px]"
        />
        <button
          onClick={() => {
            setIsOpen(true);
            setSelectedService(null);
            setName("");
            setTime("");
            setCategory("");
            setPrice("");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          + Add Service
        </button>
      </div>
      {/* table for services */}
      <div className="flex justify-center mt-7">
        <table className=" border border-gray-300 divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden w-[900px]">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase w-[800px]">
            <tr>
              <th className="py-3 px-4 text-left">No</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Time</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <Skeleton width={20} />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton width={100} />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton width={100} />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton width={150} />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton width={100} />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton width={60} />
                    </td>
                  </tr>
                ))
              : filteredServices.map((service, i) => (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4">{service.name}</td>
                    <td className="py-3 px-4">{service.category}</td>
                    <td className="py-3 px-4">{service.time} min</td>
                    <td className="py-3 px-4">${service.price}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Delete />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {selectedService ? "Edit Service" : "Add Service"}
            </h2>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="name"
              className="w-full mb-3 px-3 py-2 border rounded focus:outline-none"
            />
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              placeholder="category"
              className="w-full mb-3 px-3 py-2 border rounded focus:outline-none"
            />

            <input
              value={time}
              onChange={(e) => setTime(e.target.value)}
              type="text"
              placeholder="... minutes"
              className="w-full mb-3 px-3 py-2 border rounded focus:outline-none"
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              placeholder="price"
              className="w-full mb-3 px-3 py-2 border rounded focus:outline-none"
            />
            <div className="flex justify-end">
              {isLoading ? (
                <button
                  disabled
                  className="px-4 py-2 bg-blue-500 text-white rounded cursor-not-allowed"
                >
                  Saving...
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {selectedService ? "Update" : "Save"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
