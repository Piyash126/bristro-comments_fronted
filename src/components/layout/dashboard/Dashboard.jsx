import { FaAd, FaHome, FaSearch, FaShoppingCart } from "react-icons/fa";
import {
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaList,
  FaUsers,
  FaUtensils,
} from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
// import useAdmin from "../../hooks/useAdmin";
import useAdmin from "../../hooks/useAdmin";
import useCart from "../../hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  // const [isAdmin] = useAdmin();
  const [isAdmin] = useAdmin();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-white font-bold bg-orange-600 px-4 py-2 rounded"
      : "px-4 py-2";

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu space-y-2 p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome" className={navLinkClass}>
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems" className={navLinkClass}>
                  <FaUtensils /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems" className={navLinkClass}>
                  <FaList /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings" className={navLinkClass}>
                  <FaBook /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart" className={navLinkClass}>
                  <FaShoppingCart /> My Cart: ({cart.length})
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={navLinkClass}
                >
                  <FaCalendar /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/users" className={navLinkClass}>
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome" className={navLinkClass}>
                  <FaHome /> User Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={navLinkClass}
                >
                  <FaCalendar /> Payment History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/review" className={navLinkClass}>
                  <FaAd /> Add a Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/bookings" className={navLinkClass}>
                  <FaList /> My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/cart" className={navLinkClass}>
                  <FaShoppingCart /> My Cart
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Links */}
          <div className="divider"></div>

          <li>
            <NavLink to="/" className={navLinkClass}>
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad" className={navLinkClass}>
              <FaSearch /> Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/contact" className={navLinkClass}>
              <FaEnvelope /> Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
