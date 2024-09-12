import { Link } from 'react-router-dom';

const Header = () => {
  return (
    // <header className="p-4 bg-primary text-white">
    //   <nav>
    //     <Link to="/" className="mr-4">Home</Link>
    //     <Link to="/login" className="mr-4">Login</Link>
    //     <Link to="/register">Register</Link>
    //   </nav>
    // </header>
    <header className="navbar bg-base-100 shadow-md">
    <div className="flex-1">
    <Link to="/" className="btn btn-ghost normal-case text-xl">My React App</Link>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
      <Link to="/" className="mr-4">Home</Link>
      <Link to="/articles" className="mr-4">News</Link>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/register">Register</Link>
      </ul>
    </div>
  </header>
  );
};

export default Header;
