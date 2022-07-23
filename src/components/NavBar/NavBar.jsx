import "./NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  /// do not use <a> hyperline element which will triger page reload
  /// use Link to stop refresh
  /// But in html elements, it shows <a> tag
  return (
    <nav>
      <Link to="/orders">Order History</Link>
      {/* provide spaces */}
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
    </nav>
  );
}
