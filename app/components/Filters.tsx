"use client";

import React, { useState } from "react";

interface CrewOption {
  id: string;
  name: string;
  rank: string;
}

interface FiltersProps {
  aircraftOptions: string[];
  flightOptions: string[];
  crewOptions: CrewOption[];
  filterValues: any;
  onFilterChange: (field: string, value: any) => void;
  onReset: () => void;
  onApply: () => void;
}

export default function Filters({
  aircraftOptions,
  flightOptions,
  crewOptions,
  filterValues,
  onFilterChange,
  onReset,
  onApply,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const inputClass =
    "w-full border rounded-md shadow-md px-4 py-3 text-base focus:ring-2 focus:ring-[#0096DB]";

  return (
    <section
      className="font-sans"
      style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center p-3 bg-[#001A2A] text-white rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold flex items-center gap-2">
          🔍 Filter & Search
        </h3>
        <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          {/* Aircraft + Flight + Crew row */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Aircraft */}
            <div className="flex-1">
              <label className="block mb-1 text-[#001A2A] font-medium">
                Aircraft
              </label>
              <select
                value={filterValues.aircraft}
                onChange={(e) => onFilterChange("aircraft", e.target.value)}
                className={inputClass}
              >
                <option value="">Select Aircraft</option>
                {aircraftOptions.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Flight */}
            <div className="flex-1">
              <label className="block mb-1 text-[#001A2A] font-medium">
                Flight
              </label>
              <select
                value={filterValues.flight}
                onChange={(e) => onFilterChange("flight", e.target.value)}
                className={inputClass}
              >
                <option value="">Select Flight</option>
                {flightOptions.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Crew */}
            <div className="flex-1">
              <label className="block mb-1 text-[#001A2A] font-medium">
                Crew
              </label>
              <select
                value={filterValues.crew}
                onChange={(e) => onFilterChange("crew", e.target.value)}
                className={inputClass}
              >
                <option value="">Select Crew</option>
                {crewOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.rank && `— ${c.rank}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date row */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* From Date */}
            <div className="w-full md:w-1/4">
              <label className="block mb-1 text-[#001A2A] font-medium">
                From
              </label>
              <input
                type="date"
                value={filterValues.from}
                onChange={(e) => onFilterChange("from", e.target.value)}
                className={inputClass}
              />
            </div>

            {/* To Date */}
            <div className="w-full md:w-1/4">
              <label className="block mb-1 text-[#001A2A] font-medium">
                To
              </label>
              <input
                type="date"
                value={filterValues.to}
                onChange={(e) => onFilterChange("to", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col md:flex-row justify-end gap-3 border-t pt-4">
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 
               px-4 py-2 text-sm font-semibold text-[#001A2A]
               bg-white border border-gray-300 rounded-lg shadow 
               hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Reset
            </button>

            <button
              onClick={onApply}
              className="flex items-center justify-center gap-2 
               px-4 py-2 text-sm font-semibold text-white 
               bg-[#64AB2D] border border-gray-200 rounded-lg shadow 
               hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
