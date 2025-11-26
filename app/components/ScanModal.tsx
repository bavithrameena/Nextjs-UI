"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import {
  QrCode,
  AlertTriangle,
  User,
  MapPin,
  Clock,
  Plane,
  Monitor,
} from "lucide-react";

interface QRScanModalProps {
  open: boolean;
  onClose: () => void;
  onScan: (
    qrValue: string,
    deviceInfo: string,
    coords: { lat: number; lng: number } | null
  ) => void;
}
const STATIC_PREVIEW = {
  aircraft: "B737-800",
  flight: "GX123",
  crew: "John Doe — Captain",
  qr: "STATICQR12345",
};
export default function QRScanModal({
  open,
  onClose,
  onScan,
}: QRScanModalProps) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [deviceInfo, setDeviceInfo] = useState("");
  const [locationDenied, setLocationDenied] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );
  const [qrValue, setQrValue] = useState("");

  const requestLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setLocationDenied(true);
      }
    );
  };

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    const device = /mobile/i.test(ua)
      ? "Mobile"
      : /tablet/i.test(ua)
      ? "Tablet"
      : "Desktop";
    setDeviceInfo(device);
  };

  const handleCheckIn = () => {
    if (!qrValue) return;
    getDeviceInfo();
    requestLocation();
    onScan(qrValue, deviceInfo, coords);
    onClose();
  };

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-md shadow-2xl border border-gray-200 relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-[#001A2A]">
            <QrCode className="w-6 h-6 text-[#0096DB]" /> QR Scan Check-In
          </h2>
          <button
            onClick={onClose}
            className="text-red-600 font-bold text-lg hover:bg-red-100 p-1 rounded-full"
          >
            ✕
          </button>
        </div>

        {locationDenied && (
          <div className="absolute top-4 right-4 z-50">
            <div className="bg-red-600 text-white text-sm px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z"
                />
              </svg>
              Location access denied. Please enable location.
            </div>
          </div>
        )}

        {/* QR Scanner */}
        <div className="relative">
          <Scanner
            onError={(e) => console.error(e)}
            onScan={(codes: IDetectedBarcode[]) => {
              if (codes.length) setQrValue(codes[0].rawValue);
            }}
            constraints={{ facingMode }}
            // classNames="rounded-lg overflow-hidden"
          />

          {/* Camera switch button for mobile */}
          <button
            onClick={() =>
              setFacingMode(facingMode === "user" ? "environment" : "user")
            }
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md border"
          >
            🔄
          </button>
        </div>

        {/* Preview QR + device/location info */}
        {qrValue && (
          <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-inner space-y-2 text-sm text-gray-800">
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#0096DB]" />
              <span>
                <strong>QR:</strong> {qrValue}
              </span>
            </div>
            {coords && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>
                  Lat {coords.lat.toFixed(4)}, Lng {coords.lng.toFixed(4)}
                </span>
              </div>
            )}
            {deviceInfo && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-600" />
                <span>Device: {deviceInfo}</span>
              </div>
            )}
          </div>
        )}
        <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-inner space-y-2 text-sm text-gray-800">
          <div className="flex items-center gap-2">
            <Plane className="w-4 h-4 text-[#0096DB]" />
            <span>
              <strong>Aircraft:</strong> {STATIC_PREVIEW.aircraft}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-[#0096DB]" />
            <span>
              <strong>Flight:</strong> {STATIC_PREVIEW.flight}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#0096DB]" />
            <span>
              <strong>Crew:</strong> {STATIC_PREVIEW.crew}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <QrCode className="w-4 h-4 text-[#0096DB]" />
            <span>
              <strong>QR:</strong> {qrValue}
            </span>
          </div>
          {coords && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <span>
                Lat {coords.lat.toFixed(4)}, Lng {coords.lng.toFixed(4)}
              </span>
            </div>
          )}
          {deviceInfo && (
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>Device: {deviceInfo}</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4 flex-wrap">
          <button
            onClick={handleCheckIn}
            disabled={!qrValue}
            className="flex-1 min-w-[120px] bg-[#64AB2D] hover:bg-[#5a9925] text-white font-semibold py-2 rounded-lg shadow-md transition-colors disabled:bg-gray-400"
          >
            Check-In
          </button>
          <button
            onClick={onClose}
            className="flex-1 min-w-[120px] bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg shadow-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
