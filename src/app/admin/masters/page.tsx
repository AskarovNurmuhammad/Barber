"use client";

import { supabase } from "@/app/supabaseClient";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Edit, Delete } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Master {
  id: number;
  name: string;
  skills: string[];
  phone: string;
  time: string;
}
interface Option {
  value: string;
  label: string;
}
const AdminMasters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [masters, setMasters] = useState<Master[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<Master | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [services, setServices] = useState<Option[]>([]);

  useEffect(() => {
    getMasters();
    getServices();
  }, []);
  const filteredMasters = masters.filter((itm) =>
    itm.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  async function handleSave() {
    setIsLoading(true);
    if (selectedMaster) {
      await supabase
        .from("masters")
        .update({ name, skills, phone })
        .eq("id", selectedMaster.id);
    } else {
      await supabase.from("masters").insert([{ name, skills, phone, time }]);
    }
    setIsLoading(false);
    setIsOpen(false);
    setSelectedMaster(null);
    await getMasters();
  }

  async function getMasters() {
    setIsLoading(true);
    const { data } = await supabase.from("masters").select("*");
    setMasters(data || []);
    setIsLoading(false);
  }

  async function getServices() {
    const { data } = await supabase.from("services").select("name");
    const formatted = (data || []).map((s: { name: string }) => ({
      value: s.name,
      label: s.name,
    }));
    setServices(formatted);
  }
  async function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this master?")) {
      await supabase.from("masters").delete().eq("id", id);
      await getMasters();
    }
  }
  /**
 bu funksiya edit qiladi
 */
  const handleEdit = (master: Master) => {
    setSelectedMaster(master);
    setName(master.name);
    setSkills(master.skills);
    setPhone(master.phone);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-20 relative">
      <h1 className="text-3xl">Masters</h1>

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
            setSelectedMaster(null);
            setName("");
            setSkills([]);
            setPhone("");
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          + Add Master
        </button>
      </div>

      {/* Master list table */}
      <div className="flex justify-center mt-7">
        <table className=" border border-gray-300 divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden w-[900px]">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase w-[800px]">
            <tr>
              <th className="py-3 px-4 text-left">No</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Skills</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Working Hours</th>
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
                      <Skeleton width={150} />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton width={100} />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton width={100} />
                    </td>
                    <td className="py-3 px-4">
                      <Skeleton width={60} />
                    </td>
                  </tr>
                ))
              : filteredMasters.map((master, i) => (
                  <tr key={master.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{i + 1}</td>
                    <td className="py-3 px-4">{master.name}</td>
                    <td className="py-3 px-4">{master.skills.join(", ")}</td>
                    <td className="py-3 px-4">{master.phone}</td>
                    <td className="py-3 px-4">{master.time}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(master)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit />
                      </button>
                      <button
                        onClick={() => handleDelete(master.id)}
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
              {selectedMaster ? "Edit Master" : "Add Master"}
            </h2>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded focus:outline-none"
            />

            <Select
              isMulti
              options={services}
              value={services.filter((opt) => skills.includes(opt.value))}
              onChange={(selected) =>
                setSkills(selected.map((opt) => opt.value))
              }
              className="mb-3"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mb-3 px-3 py-2 border rounded focus:outline-none"
            />
            <input
              type="text"
              placeholder="Working Hours (e.g. 9:00 - 18:00)"
              value={time}
              onChange={(e) => setTime(e.target.value)}
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
                  {selectedMaster ? "Update" : "Save"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMasters;
