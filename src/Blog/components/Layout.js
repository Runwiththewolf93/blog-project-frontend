import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, handleSearch }) => {
  return (
    <>
      {handleSearch ? <Navbar handleSearch={handleSearch} /> : <Navbar />}
      <div className="mt-5">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
