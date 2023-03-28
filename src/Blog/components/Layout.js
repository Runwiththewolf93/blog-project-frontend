import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, handleSearch }) => {
  return (
    <>
      {handleSearch ? <Navbar handleSearch={handleSearch} /> : <Navbar />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
