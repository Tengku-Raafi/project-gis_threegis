import { Bell, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function DashboardNavbar({
  userName = "Admin ThreeGIS",
  profilePhoto = "https://i.pravatar.cc/40?img=12",
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 rounded-b-xl shadow-sm">
      
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-slate-800">
          Dashboard
        </h1>
        <input
          placeholder="Search anything"
          className="hidden md:block px-4 py-2 rounded-lg bg-slate-100 text-sm outline-none"
        />
      </div>

      <div className="flex items-center gap-4 relative">
        <button className="relative">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2"
        >
          <img
            src={profilePhoto}
            className="w-9 h-9 rounded-full"
            alt="profile"
          />
          <span className="text-sm font-medium text-slate-700">
            {userName}
          </span>
        </button>
      </div>
    </div>
  );
}
