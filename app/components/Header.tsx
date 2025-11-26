export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="header-inner px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://globalxair.com/wp-content/uploads/2024/07/GlobalX_TM_Logo.webp"
            alt="GlobalX Logo"
            className="h-10 w-auto object-contain"
          />
          <div className="leading-tight">
            <div className="text-white font-bold font-lg text-base">
              Crew Check-In Tracker
            </div>
            {/* // <div className="tiny text-white/80">Crew Check-In Dashboard</div> */}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-lg text-white/90">
            Welcome, <span className="font-bold">Bavithra</span>
          </div>
          <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zM3 21c0-3 4.5-5 9-5s9 2 9 5"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
