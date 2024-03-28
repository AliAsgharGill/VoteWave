import { Footer } from "../../Components/Footer/Footer";
import { Nav } from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
