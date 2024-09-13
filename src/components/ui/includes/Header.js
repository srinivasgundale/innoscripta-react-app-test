import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import logout from "../../../store/slices/authSlice";
const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className="navbar bg-base-100 shadow-md">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          My React App
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <Link to="/" className="mr-4">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/articles" className="mr-4">
                News
              </Link>

              <Link onClick={handleLogout}>Welcome, {user?.name} Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
