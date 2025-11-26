"use client";
import React from "react";

interface QRScannerSectionProps {
  onOpenCrewCheckIn: () => void;
  onOpenQRScan: () => void;
}

export default function QRScannerSection({
  onOpenCrewCheckIn,
  onOpenQRScan,
}: QRScannerSectionProps) {
  return (
    <section className="qr-scanner-section mb-4">
      <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-md border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Text */}
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-[#0B3C61] mb-1">
              👨‍👩‍👧 Quick Crew Check-In
            </h3>
            <p className="text-sm text-gray-700">
              Scan QR codes or manually record crew check-ins instantly
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:gap-2 w-full md:w-auto">
            <button
              onClick={onOpenCrewCheckIn}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#0B3C61] text-white text-sm font-semibold 
                   border border-gray-200 rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              👤 Crew Check-In
            </button>

            <button
              onClick={onOpenQRScan}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 
             bg-[#22C55E] text-white text-sm font-semibold 
             border border-gray-200 rounded-lg shadow 
             hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              📷 QR Scan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
