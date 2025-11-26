"use client";

import React, { useState } from "react";

export default function CrewTable({ rows }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(rows.length / rowsPerPage);

  const computeStatus = (ciActual: string, reportCI: string) => {
    if (!ciActual || ciActual === "--") return "Missed";
    const [h1, m1] = ciActual.split(":").map(Number);
    const [h2, m2] = reportCI.split(":").map(Number);
    const delta = h1 * 60 + m1 - (h2 * 60 + m2);
    if (delta >= 0 && delta <= 5) return "On Time";
    if (delta > 5 && delta <= 15) return "Late";
    return "Missed";
  };

  return (
    <section className="w-full max-w-[1400px] mx-auto my-6 p-4 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#001A2A]">
            Check-In Records
          </h3>
          <p className="text-sm text-gray-500">
            Live feed from QR scanner & manual entries
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Showing <span id="row-count">{rows.length}</span> rows
        </div>
      </div>

      {/* Table for larger screens */}
      <div className="hidden md:block overflow-x-auto table-wrap">
        <table className="min-w-full border-separate border-spacing-0 rounded-lg">
          <thead className="bg-[#0B3C61] text-white text-left">
            <tr>
              <th className="px-3 py-2 rounded-tl-lg">Aircraft</th>
              <th className="px-3 py-2">Flight</th>
              <th className="px-3 py-2">Date(UTC)</th>
              <th className="px-3 py-2">CI (Actual)</th>
              <th className="px-3 py-2">Report CI</th>
              <th className="px-3 py-2">DEP</th>
              <th className="px-3 py-2">ARR</th>
              <th className="px-3 py-2">STD</th>
              <th className="px-3 py-2">STA</th>
              <th className="px-3 py-2">CO</th>
              <th className="px-3 py-2">Total HRS</th>
              <th className="px-3 py-2 rounded-tr-lg">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {currentRows.length === 0 ? (
              <tr>
                <td
                  colSpan={12}
                  className="px-3 py-4 text-center text-gray-400"
                >
                  No records
                </td>
              </tr>
            ) : (
              currentRows.map((r: any) => (
                <tr
                  key={r.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-3 py-2 font-medium">{r.aircraft}</td>
                  <td className="px-3 py-2">{r.flight}</td>

                  {/* Formatted date MM/DD/YYYY */}
                  <td className="px-3 py-2">
                    {r.date
                      ? new Date(r.date).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })
                      : "--"}
                  </td>

                  <td className="px-3 py-2">{r.ciActual}</td>
                  <td className="px-3 py-2">{r.reportCI}</td>
                  <td className="px-3 py-2">{r.dep}</td>
                  <td className="px-3 py-2">{r.arr}</td>
                  <td className="px-3 py-2">{r.std}</td>
                  <td className="px-3 py-2">{r.sta}</td>
                  <td className="px-3 py-2">{r.co}</td>
                  <td className="px-3 py-2">{Number(r.total).toFixed(1)}</td>

                  <td className="px-3 py-2">
                    <span
                      className={`w-20 px-3 py-1 rounded-full text-white text-xs font-semibold inline-block text-center ${
                        computeStatus(r.ciActual, r.reportCI) === "On Time"
                          ? "bg-emerald-400"
                          : computeStatus(r.ciActual, r.reportCI) === "Late"
                          ? "bg-amber-400"
                          : "bg-red-400"
                      }`}
                    >
                      {computeStatus(r.ciActual, r.reportCI)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Card view for small screens */}
      <div className="md:hidden flex flex-col gap-4">
        {currentRows.length === 0 ? (
          <p className="text-center text-gray-400">No records</p>
        ) : (
          currentRows.map((r: any) => (
            <div
              key={r.id}
              className="bg-white border rounded-lg shadow-sm p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-[#001A2A]">{r.aircraft}</p>
                <span
                  className={`px-3 py-1 rounded-full text-white text-xs font-semibold inline-block text-center ${
                    computeStatus(r.ciActual, r.reportCI) === "On Time"
                      ? "bg-emerald-400"
                      : computeStatus(r.ciActual, r.reportCI) === "Late"
                      ? "bg-amber-400"
                      : "bg-red-400"
                  }`}
                >
                  {computeStatus(r.ciActual, r.reportCI)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <p>
                  <strong>Flight:</strong> {r.flight}
                </p>
                <p>
                  <strong>Date:</strong> {r.date}
                </p>
                <p>
                  <strong>CI (Actual):</strong> {r.ciActual}
                </p>
                <p>
                  <strong>Report CI:</strong> {r.reportCI}
                </p>
                <p>
                  <strong>DEP:</strong> {r.dep}
                </p>
                <p>
                  <strong>ARR:</strong> {r.arr}
                </p>
                <p>
                  <strong>STD:</strong> {r.std}
                </p>
                <p>
                  <strong>STA:</strong> {r.sta}
                </p>
                <p>
                  <strong>CO:</strong> {r.co}
                </p>
                <p>
                  <strong>Total HRS:</strong> {Number(r.total).toFixed(1)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`
      px-4 py-1.5 rounded-md border text-sm font-medium transition
      ${
        currentPage === 1
          ? "border-[#A7B2BA] text-[#A7B2BA] cursor-not-allowed"
          : "border-[#0B3C61] text-[#0B3C61] hover:bg-[#E5F2FF]"
      }
    `}
        >
          Prev
        </button>

        <span className="px-3 py-1 text-sm font-semibold text-[#0B3C61]">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`
      px-4 py-1.5 rounded-md border text-sm font-medium transition
      ${
        currentPage === totalPages
          ? "border-[#A7B2BA] text-[#A7B2BA] cursor-not-allowed"
          : "border-[#0B3C61] text-[#0B3C61] hover:bg-[#E5F2FF]"
      }
    `}
        >
          Next
        </button>
      </div>
    </section>
  );
}
