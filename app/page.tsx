"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import QRScannerSection from "./components/QRScannerSection";
import Filters from "./components/Filters";
import CrewTable from "./components/CrewTable";
import Footer from "./components/Footer";
import CrewCheckin from "./components/CrewCheckin";
import QRScanModal from "./components/ScanModal";

// ----------------------------------------------------------------------
// STATIC DATA
// ----------------------------------------------------------------------

const AIRCRAFTS = [
  {
    tail: "N123AB",
    geo: { lat: 33.6407, lon: -84.4277 },
    flights: [
      {
        id: "AC321",
        depCode: "ATL",
        arrCode: "MIA",
        std: "07:00",
        sta: "09:00",
      },
      {
        id: "AC654",
        depCode: "MIA",
        arrCode: "ORD",
        std: "13:00",
        sta: "15:30",
      },
    ],
  },
  {
    tail: "N987CD",
    geo: { lat: 40.6413, lon: -73.7781 },
    flights: [
      {
        id: "NC874",
        depCode: "JFK",
        arrCode: "LHR",
        std: "06:30",
        sta: "09:00",
      },
    ],
  },
  {
    tail: "N456EF",
    geo: { lat: 34.0522, lon: -118.2437 },
    flights: [
      {
        id: "EF420",
        depCode: "LAX",
        arrCode: "SFO",
        std: "10:00",
        sta: "12:30",
      },
    ],
  },
];

const CREW = [
  { id: "C1", name: "John Adams", rank: "Captain" },
  { id: "C2", name: "Rita King", rank: "First Officer" },
  { id: "C3", name: "Sam Li", rank: "Flight Attendant" },
  { id: "C4", name: "L. Ortiz", rank: "Flight Attendant" },
  { id: "C5", name: "Mike Chen", rank: "Captain" },
  { id: "C6", name: "Sarah Wilson", rank: "First Officer" },
];

 const FLIGHTS = [
  {
    id: "F101",
    flightNo: "GX101",
    aircraftId: "A1",
    dep: "MIA",
    arr: "JFK",
    std: "08:30",
    sta: "11:20",
  },
  {
    id: "F102",
    flightNo: "GX102",
    aircraftId: "A1",
    dep: "JFK",
    arr: "MIA",
    std: "12:20",
    sta: "15:10",
  },
  {
    id: "F201",
    flightNo: "GX201",
    aircraftId: "A2",
    dep: "MIA",
    arr: "LAS",
    std: "09:00",
    sta: "12:40",
  },
  {
    id: "F202",
    flightNo: "GX202",
    aircraftId: "A2",
    dep: "LAS",
    arr: "MIA",
    std: "14:00",
    sta: "19:10",
  },
  {
    id: "F301",
    flightNo: "GX301",
    aircraftId: "A3",
    dep: "MCO",
    arr: "CLT",
    std: "07:45",
    sta: "09:50",
  },
  {
    id: "F302",
    flightNo: "GX302",
    aircraftId: "A3",
    dep: "CLT",
    arr: "MCO",
    std: "10:40",
    sta: "12:50",
  },
];

let initialRows = [
  {
    id: 1,
    aircraft: "N123AB",
    flight: "AC321",
    date: "2025-11-10",
    ciActual: "06:25",
    reportCI: "06:15",
    dep: "ATL",
    arr: "MIA",
    std: "07:00",
    sta: "09:00",
    co: "09:15",
    total: 2.0,
    crew: "John Adams",
    rank: "Captain",
    qr: true,
    oob: false,
  },
  {
    id: 2,
    aircraft: "N123AB",
    flight: "AC654",
    date: "2025-11-11",
    ciActual: "06:35",
    reportCI: "06:15",
    dep: "MIA",
    arr: "ORD",
    std: "13:00",
    sta: "15:30",
    co: "15:45",
    total: 2.0,
    crew: "Rita King",
    rank: "First Officer",
    qr: true,
    oob: false,
  },
  {
    id: 3,
    aircraft: "N987CD",
    flight: "NC874",
    date: "2025-11-10",
    ciActual: "--",
    reportCI: "06:30",
    dep: "JFK",
    arr: "LHR",
    std: "06:30",
    sta: "09:00",
    co: "09:20",
    total: 2.5,
    crew: "Sam Li",
    rank: "Flight Attendant",
    qr: false,
    oob: false,
  },
  {
    id: 4,
    aircraft: "N456EF",
    flight: "EF420",
    date: "2025-11-12",
    ciActual: "09:50",
    reportCI: "09:40",
    dep: "LAX",
    arr: "SFO",
    std: "10:00",
    sta: "12:30",
    co: "12:35",
    total: 2.5,
    crew: "L. Ortiz",
    rank: "Flight Attendant",
    qr: true,
    oob: false,
  },
  {
    id: 5,
    aircraft: "N123AB",
    flight: "AC321",
    date: "2025-11-13",
    ciActual: "07:05",
    reportCI: "06:50",
    dep: "ATL",
    arr: "MIA",
    std: "07:00",
    sta: "09:00",
    co: "09:10",
    total: 2.0,
    crew: "Mike Chen",
    rank: "Captain",
    qr: false,
    oob: false,
  },
  {
    id: 6,
    aircraft: "N987CD",
    flight: "NC874",
    date: "2025-11-14",
    ciActual: "--",
    reportCI: "06:30",
    dep: "JFK",
    arr: "LHR",
    std: "06:30",
    sta: "09:00",
    co: "09:20",
    total: 2.5,
    crew: "Sarah Wilson",
    rank: "First Officer",
    qr: true,
    oob: false,
  },
  {
    id: 7,
    aircraft: "N456EF",
    flight: "EF420",
    date: "2025-11-15",
    ciActual: "09:55",
    reportCI: "09:45",
    dep: "LAX",
    arr: "SFO",
    std: "10:00",
    sta: "12:30",
    co: "12:35",
    total: 2.5,
    crew: "John Adams",
    rank: "Captain",
    qr: true,
    oob: false,
  },
  {
    id: 8,
    aircraft: "N123AB",
    flight: "AC654",
    date: "2025-11-16",
    ciActual: "06:40",
    reportCI: "06:20",
    dep: "MIA",
    arr: "ORD",
    std: "13:00",
    sta: "15:30",
    co: "15:40",
    total: 2.0,
    crew: "Rita King",
    rank: "First Officer",
    qr: false,
    oob: false,
  },
  {
    id: 9,
    aircraft: "N987CD",
    flight: "NC874",
    date: "2025-11-17",
    ciActual: "--",
    reportCI: "06:30",
    dep: "JFK",
    arr: "LHR",
    std: "06:30",
    sta: "09:00",
    co: "09:20",
    total: 2.5,
    crew: "Sam Li",
    rank: "Flight Attendant",
    qr: true,
    oob: false,
  },
  {
    id: 10,
    aircraft: "N456EF",
    flight: "EF420",
    date: "2025-11-18",
    ciActual: "09:45",
    reportCI: "09:40",
    dep: "LAX",
    arr: "SFO",
    std: "10:00",
    sta: "12:30",
    co: "12:35",
    total: 2.5,
    crew: "L. Ortiz",
    rank: "Flight Attendant",
    qr: false,
    oob: false,
  },
];

// ----------------------------------------------------------------------
// MAIN PAGE COMPONENT
// ----------------------------------------------------------------------

export default function Page() {
  const [rows, setRows] = useState(initialRows);
  const [filteredRows, setFilteredRows] = useState(initialRows);

  // "crew" or "qr" or null
  const [openModal, setOpenModal] = useState<"crew" | "qr" | null>(null);

  const [filters, setFilters] = useState({
    aircraft: "All",
    flight: "All",
    crew: "All",
    from: "",
    to: "",
  });

  // ------------------- FILTER LOGIC -------------------
  function applyFilters() {
    let data = [...rows];
    if (filters.aircraft !== "All")
      data = data.filter((r) => r.aircraft === filters.aircraft);
    if (filters.flight !== "All")
      data = data.filter((r) => r.flight === filters.flight);
    if (filters.crew !== "All") {
      const selectedCrew = CREW.find((c) => c.id === filters.crew)?.name;
      data = data.filter((r) => r.crew === selectedCrew);
    }
    if (filters.from) data = data.filter((r) => r.date >= filters.from);
    if (filters.to) data = data.filter((r) => r.date <= filters.to);
    setFilteredRows(data);
  }

  function resetFilters() {
    setFilters({
      aircraft: "All",
      flight: "All",
      crew: "All",
      from: "",
      to: "",
    });
    setFilteredRows(rows);
  }

  function handleFilterChange(field: string, value: any) {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }

  // ------------------- HANDLE SAVE -------------------
  function handleSaveCrewModal(data: any) {
    const newEntry = {
      id: rows.length + 1,
      aircraft: data.aircraft,
      flight: "--",
      date: new Date().toISOString().slice(0, 10),
      ciActual: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      reportCI: "--",
      dep: "--",
      arr: "--",
      std: "--",
      sta: "--",
      co: "--",
      total: 0,
      crew: CREW.find((c) => c.id === data.crewId)?.name || "",
      rank: CREW.find((c) => c.id === data.crewId)?.rank || "",
      qr: true,
      oob: false,
    };
    const updated = [...rows, newEntry];
    setRows(updated);
    setFilteredRows(updated);
    setOpenModal(null);
  }

  function handleSaveQRScan(
    qrValue: string,
    deviceInfo: string,
    coords: { lat: number; lng: number } | null
  ) {
    const updatedRows = rows.map((row) => ({
      ...row,
      status: "UPDATED FROM QR",
      qrValue,
      device: deviceInfo,
      coords,
    }));
    setRows(updatedRows);
    setFilteredRows(updatedRows);
    setOpenModal(null);
  }

  // ------------------- FILTER OPTIONS -------------------
  const aircraftOptions = ["All", ...AIRCRAFTS.map((a) => a.tail)];
  const flightOptions = [
    "All",
    ...AIRCRAFTS.flatMap((a) => a.flights.map((f) => f.id)),
  ];
  const crewOptions = [{ id: "All", name: "All", rank: "" }, ...CREW];

  // ------------------- RENDER -------------------
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QRScannerSection
          onOpenCrewCheckIn={() => setOpenModal("crew")}
          onOpenQRScan={() => setOpenModal("qr")}
        />

        <Filters
          aircraftOptions={aircraftOptions}
          flightOptions={flightOptions}
          crewOptions={crewOptions}
          filterValues={filters}
          onFilterChange={handleFilterChange}
          onReset={resetFilters}
          onApply={applyFilters}
        />

        {/* ------------------- MODALS ------------------- */}
        {openModal === "crew" && (
          <CrewCheckin
            open={true}
            onClose={() => setOpenModal(null)}
            onSave={handleSaveCrewModal}
            aircrafts={aircraftOptions}
            crewList={crewOptions}
            flights={flightOptions}
          />
        )}

        {openModal === "qr" && (
          <QRScanModal
            open={true}
            onClose={() => setOpenModal(null)}
            onScan={handleSaveQRScan}
          />
        )}

        <CrewTable rows={filteredRows} crewList={CREW} />

        <Footer />
      </main>
    </>
  );
}
