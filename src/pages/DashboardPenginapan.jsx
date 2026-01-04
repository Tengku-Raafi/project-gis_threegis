// DashboardPenginapan.jsx
import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardPenginapan() {
  // ================= KPI =================
  const kpis = [
    { title: "New Booking", value: 872, color: "indigo" },
    { title: "Scheduled Room", value: 458, color: "orange" },
    { title: "Check In", value: 97, color: "teal" },
    { title: "Check Out", value: 48, color: "rose" },
  ];

  const lineData = {
    labels: ["01","02","03","04","05","06","07","08","09","10","11","12"],
    datasets: [
      {
        label: "Check In",
        data: [300,350,700,520,480,900,780,820,610,750,920,700],
        borderColor: "#14B8A6",
        backgroundColor: "rgba(20,184,166,0.25)",
        fill: true,
        tension: 0.45,
        pointRadius: 0,
      },
      {
        label: "Check Out",
        data: [250,260,420,380,360,500,450,480,400,520,560,450],
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245,158,11,0.25)",
        fill: true,
        tension: 0.45,
        pointRadius: 0,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 10,
          usePointStyle: true,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: "#F1F5F9", drawBorder: false },
        ticks: { stepSize: 200 },
      },
    },
  };

  const barData = {
    labels: ["06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21"],
    datasets: [
      {
        data: [400,520,480,600,580,450,500,620,700,650,720,680,640,600,560,580],
        backgroundColor: "#F59E0B",
        borderRadius: 8,
        barThickness: 10,
      },
    ],
  };

  const barOptions = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { display: false } },
    },
  };

  const pieData = {
    labels: ["Check In", "Check Out"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#14B8A6", "#F59E0B"],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    cutout: "70%",
    plugins: { legend: { position: "bottom" } },
  };

  return (
    <div className="flex min-h-screen bg-[#FFF9F2]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar />

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <KpiCard key={kpi.title} {...kpi} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProgressCard title="Available Room Today" value={345} total={530} color="orange" />
            <ProgressCard title="Sold Out Room Today" value={185} total={530} color="teal" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 h-[340px]">
              <h2 className="font-semibold text-slate-800 mb-2">
                Reservation Statistic
              </h2>
              <Line data={lineData} options={lineOptions} />
            </div>

            <GuestList />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="font-semibold text-slate-800 mb-2">Total Revenue</h2>
              <Bar data={barData} options={barOptions} />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center">
              <h2 className="font-semibold text-slate-800 mb-2">
                Check In / Out
              </h2>
              <Doughnut data={pieData} options={pieOptions} />
            </div>

            <Calendar />
          </div>

        </div>
      </div>
    </div>
  );
}

const KpiCard = ({ title, value, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-4">
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-2xl font-bold text-slate-800">{value}</p>
    <div className="mt-3 h-2 bg-gray-200 rounded-full">
      <div
        className={`h-2 rounded-full bg-${color}-500`}
        style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
      />
    </div>
  </div>
);

const ProgressCard = ({ title, value, total, color }) => {
  const percent = Math.round((value / total) * 100);
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <div className="flex justify-between items-end mt-2">
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-sm text-gray-400">Total {total}</p>
      </div>
      <div className="mt-3 h-2 bg-gray-200 rounded-full">
        <div
          className={`h-2 rounded-full bg-${color}-500`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

const GuestList = () => {
  const guests = ["Jane Cooper","Floyd Miles","Eleanor Pena","Brooklyn Simmons","Guy Hawkins"];
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="font-semibold text-slate-800 mb-3">Guest List</h2>
      <ul className="space-y-3">
        {guests.map((g, i) => (
          <li key={i} className="flex items-center gap-3">
            <img src={`https://i.pravatar.cc/40?img=${i+10}`} className="rounded-full" />
            <span className="text-sm">{g}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Calendar = () => (
  <div className="bg-white rounded-xl shadow-sm p-4">
    <h2 className="font-semibold text-slate-800 mb-3">Calendar</h2>
    <div className="grid grid-cols-7 text-center gap-1 text-sm">
      {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
        <span key={d} className="text-gray-400">{d}</span>
      ))}
      {Array.from({ length: 30 }, (_, i) => (
        <span
          key={i}
          className={`py-2 rounded-lg ${
            i + 1 === new Date().getDate()
              ? "bg-indigo-500 text-white"
              : "hover:bg-indigo-100"
          }`}
        >
          {i + 1}
        </span>
      ))}
    </div>
  </div>
);
