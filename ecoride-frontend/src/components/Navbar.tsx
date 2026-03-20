import { NavLink } from "react-router-dom";

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  [
    "rounded-xl px-4 py-2 text-sm font-medium transition",
    isActive
      ? "bg-emerald-500 text-white shadow-sm"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            EcoRide
          </h1>
          <p className="text-xs text-slate-500">Fleet Management Platform</p>
        </div>

        <nav className="flex items-center gap-2">
          <NavLink to="/dashboard" className={navItemClass}>
            Dashboard
          </NavLink>
          <NavLink to="/users" className={navItemClass}>
            Users
          </NavLink>
          <NavLink to="/vehicles" className={navItemClass}>
            Vehicles
          </NavLink>
          <NavLink to="/maintenance" className={navItemClass}>
            Maintenance
          </NavLink>
        </nav>
      </div>
    </header>
  );
}