import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, handleSearch }) => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      {handleSearch ? <Navbar handleSearch={handleSearch} /> : <Navbar />}
      <div className="flex-grow-1 mt-3">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
