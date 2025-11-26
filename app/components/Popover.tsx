const Popover = ({ type, message, onClose }: any) => {
  const types = {
    success: {
      bg: "bg-green-100",
      border: "border-green-300",
      text: "text-green-700",
      icon: (
        <svg
          className="w-6 h-6 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    info: {
      bg: "bg-blue-100",
      border: "border-blue-300",
      text: "text-blue-700",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m2-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
      ),
    },
    warning: {
      bg: "bg-amber-100",
      border: "border-amber-300",
      text: "text-amber-700",
      icon: (
        <svg
          className="w-6 h-6 text-amber-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14"
          />
        </svg>
      ),
    },
    error: {
      bg: "bg-red-100",
      border: "border-red-300",
      text: "text-red-700",
      icon: (
        <svg
          className="w-6 h-6 text-red-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
          />
        </svg>
      ),
    },
  };

  const style = types[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Popover Box */}
      <div
        className={`relative px-6 py-4 rounded-2xl shadow-xl border ${style.bg} ${style.border} max-w-sm w-[90%] animate-pop`}
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Content */}
        <div className={`flex items-center gap-3 ${style.text}`}>
          {style.icon}
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Popover;
