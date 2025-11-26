"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plane,
  User,
  Monitor,
  Clock,
  MapPin,
  AlertTriangle,
} from "lucide-react";
import Popover from "./Popover";

interface CrewCheckInModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  aircrafts: string[];
  flights: string[];
  crewList: any[];
}

export default function CrewCheckInModal({
  open,
  onClose,
  onSave,
  aircrafts,
  flights,
  crewList,
}: CrewCheckInModalProps) {
  const [selectedAircraft, setSelectedAircraft] = useState("");
  const [selectedFlight, setSelectedFlight] = useState("");
  const [selectedCrew, setSelectedCrew] = useState("");
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [deviceInfo, setDeviceInfo] = useState("");
  const [locationDenied, setLocationDenied] = useState(false);

  // Reset modal and fetch device info + location when modal opens
  useEffect(() => {
    if (!open) return;

    setSelectedAircraft("");
    setSelectedFlight("");
    setSelectedCrew("");
    setCoords(null);
    setDeviceInfo("");
    setLocationDenied(false);

    // Device info
    const ua = navigator.userAgent;
    const device = /mobile/i.test(ua)
      ? "Mobile"
      : /tablet/i.test(ua)
      ? "Tablet"
      : "Desktop";
    setDeviceInfo(device);

    // Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => {
          if (err.code === err.PERMISSION_DENIED) setLocationDenied(true);
        }
      );
    } else {
      setLocationDenied(true);
    }
  }, [open]);

  const crewData = crewList.find((c) => c.id === selectedCrew);

  const handleCheckIn = () => {
    onSave({
      aircraft: selectedAircraft,
      flight: selectedFlight,
      crewId: selectedCrew,
      coords,
      deviceInfo,
    });
    onClose();
  };

  if (!open) return null;

  const showPreview = selectedAircraft && selectedFlight && selectedCrew;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl border border-gray-200 relative overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-[#001A2A]">
            <Plane className="w-6 h-6 text-[#0096DB]" /> Crew Check-In
          </h2>
          <button
            onClick={onClose}
            className="text-red-600 font-bold text-lg hover:bg-red-100 p-1 rounded-full"
          >
            ✕
          </button>
        </div>

        {/* Location Denied */}
        {locationDenied && (
          <div className="flex items-center gap-2 bg-red-100 text-red-700 p-3 rounded mb-4 border border-red-300">
            <AlertTriangle className="w-5 h-5" />
            Location access denied. Please enable location.
          </div>
        )}

        {/* Selections */}
        {!showPreview && (
          <div className="space-y-4">
            <select
              className="border w-full px-3 py-3 rounded-md shadow-sm focus:ring-2 focus:ring-[#0096DB] text-base"
              value={selectedAircraft}
              onChange={(e) => setSelectedAircraft(e.target.value)}
            >
              <option value="">Select Aircraft</option>
              {aircrafts.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>

            <select
              className="border w-full px-3 py-3 rounded-md shadow-sm focus:ring-2 focus:ring-[#0096DB] text-base"
              value={selectedFlight}
              onChange={(e) => setSelectedFlight(e.target.value)}
            >
              <option value="">Select Flight</option>
              {flights.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>

            <select
              className="border w-full px-3 py-3 rounded-md shadow-sm focus:ring-2 focus:ring-[#0096DB] text-base"
              value={selectedCrew}
              onChange={(e) => setSelectedCrew(e.target.value)}
            >
              <option value="">Select Crew</option>
              {crewList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.rank}
                </option>
              ))}
            </select>
          </div>
        )}

        {showPreview && (
          <>
            <div className="mt-6 p-4 border border-gray-200 rounded-xl bg-white shadow-lg space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2 text-[#001A2A]">
                <Monitor className="w-5 h-5 text-[#0096DB]" /> Preview Check-In
              </h3>
              <div className="space-y-3 text-gray-800 text-sm">
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-[#0096DB]" />
                  <span>
                    <strong>Aircraft:</strong> {selectedAircraft}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-[#0096DB]" />
                  <span>
                    <strong>Flight:</strong> {selectedFlight}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#0096DB]" />
                  <span>
                    <strong>Crew:</strong> {crewData?.name} — {crewData?.rank}
                  </span>
                </div>
                {coords && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span>
                      <strong>Location:</strong> Lat {coords.lat.toFixed(4)},
                      Lng {coords.lng.toFixed(4)}
                    </span>
                  </div>
                )}
                {deviceInfo && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span>
                      <strong>Device:</strong> {deviceInfo}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="flex gap-3 mt-6 flex-wrap">
          <button
            onClick={handleCheckIn}
            disabled={!selectedAircraft || !selectedFlight || !selectedCrew}
            className="flex-1 min-w-[140px] bg-[#64AB2D] hover:bg-[#5a9925] text-white font-semibold py-2 rounded-lg shadow-md transition-colors duration-200 disabled:bg-gray-400"
          >
            Check-In
          </button>
          <button
            onClick={onClose}
            className="flex-1 min-w-[140px] bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg shadow-sm transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
