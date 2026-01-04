import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Activity,
  PlusCircle,
  Edit,
  Trash2,
  LogIn,
} from "lucide-react";

export default function LogHistory() {
  const logs = [
    {
      id: 1,
      action: "Add Accommodation",
      description: "Hotel OneFour added successfully",
      user: "Admin",
      icon: <PlusCircle className="text-emerald-600" />,
      time: "2 minutes ago",
    },
    {
      id: 2,
      action: "Edit Accommodation",
      description: "Updated price for Homestay Mawar",
      user: "Admin",
      icon: <Edit className="text-indigo-600" />,
      time: "30 minutes ago",
    },
    {
      id: 3,
      action: "Delete Accommodation",
      description: "Wisma Melati removed",
      user: "Admin",
      icon: <Trash2 className="text-rose-600" />,
      time: "Yesterday",
    },
    {
      id: 4,
      action: "Login",
      description: "Admin logged in to dashboard",
      user: "Admin",
      icon: <LogIn className="text-slate-600" />,
      time: "Yesterday",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#FFF9F2]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar />

        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-6">
            Activity Log
          </h1>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-2 font-semibold text-slate-800 mb-6">
              <Activity />
              Recent Activities
            </div>

            <div className="relative space-y-6">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-200"></div>

              {logs.map((log) => (
                <div key={log.id} className="flex gap-4">
                  <div className="relative z-10 w-10 h-10 rounded-full bg-[#F3EFEA] flex items-center justify-center shadow-sm">
                    {log.icon}
                  </div>

                  <div className="flex-1 bg-[#FFF9F2] rounded-xl p-4 border border-slate-100">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-slate-800">
                        {log.action}
                      </p>
                      <span className="text-xs text-slate-400">
                        {log.time}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mt-1">
                      {log.description}
                    </p>

                    <p className="text-xs text-slate-400 mt-2">
                      Performed by <span className="font-medium">{log.user}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
