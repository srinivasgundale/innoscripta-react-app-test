import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../store/slices/authSlice"; // Update import to ensure correct dispatch

const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-2xl">
            🚀 The New York Times
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/articles">News</Link>
                </li>

                <li>
                  <details>
                    <summary>Welcome, {user?.name}</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <li>
                        <a onClick={handleLogout}>Logout</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
