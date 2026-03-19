import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "#1f2937" }}>
      <Link to="/" style={{ color: "white", marginRight: "20px", textDecoration: "none" }}>
        Users
      </Link>
      <Link to="/vehicles" style={{ color: "white", marginRight: "20px", textDecoration: "none" }}>
        Vehicles
      </Link>
      <Link to="/maintenance" style={{ color: "white", textDecoration: "none" }}>
        Maintenance
      </Link>
    </nav>
  );
}