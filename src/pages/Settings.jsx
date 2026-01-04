import Sidebar from "../components/Sidebar";
import DashboardNavbar from "../components/DashboardNavbar";
import { User, Lock, Bell, Palette, LogOut } from "lucide-react";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-[#FFF9F2]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar />

        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>

          <Section title="Profile Settings" icon={<User />}>
            <Grid>
              <Input label="Full Name" placeholder="Admin ThreeGIS" />
              <Input label="Email" placeholder="admin@gmail.com" />
            </Grid>
            <SaveBtn />
          </Section>

          <Section title="Account Security" icon={<Lock />}>
            <Grid>
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm Password" type="password" />
            </Grid>
            <SaveBtn />
          </Section>

          <Section title="Notification Preferences" icon={<Bell />}>
            <Toggle label="Email Notifications" />
            <Toggle label="Dashboard Alerts" />
            <Toggle label="New Booking Reminder" />
          </Section>

          <Section title="Appearance" icon={<Palette />}>
            <Grid>
              <Select label="Theme">
                <option>Cream Soft</option>
                <option>Dark Navy</option>
              </Select>
              <Select label="Language">
                <option>Bahasa Indonesia</option>
                <option>English</option>
              </Select>
            </Grid>
            <SaveBtn />
          </Section>
        </div>
      </div>
    </div>
  );
}


const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
    <div className="flex items-center gap-2 font-semibold text-slate-800">
      {icon}
      {title}
    </div>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm font-medium text-slate-600">{label}</label>
    <input
      {...props}
      className="w-full mt-1 px-4 py-2 rounded-xl bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300"
    />
  </div>
);

const Select = ({ label, children }) => (
  <div>
    <label className="text-sm font-medium text-slate-600">{label}</label>
    <select className="w-full mt-1 px-4 py-2 rounded-xl bg-slate-100">
      {children}
    </select>
  </div>
);

const Toggle = ({ label }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm text-slate-700">{label}</span>
    <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-pointer">
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
    </div>
  </div>
);

const SaveBtn = () => (
  <div className="flex justify-end">
    <button className="px-4 py-2 rounded-xl bg-slate-800 text-white hover:bg-slate-700">
      Save Changes
    </button>
  </div>
);
