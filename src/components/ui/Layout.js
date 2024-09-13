import { Outlet } from "react-router-dom";
import Header from "./includes/Header";
import Footer from "./includes/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
