import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Renders the layout component with the given children and optional handleSearch function.
 *
 * @param {React.ReactNode} children - The children to be rendered inside the layout.
 * @param {Function} handleSearch - Optional function to handle search.
 * @return {React.ReactNode} The rendered layout component.
 */
// Layout component
const Layout = ({
  children = <div>No content to display</div>,
  handleSearch,
}) => {
  return (
    <>
      {handleSearch ? <Navbar handleSearch={handleSearch} /> : <Navbar />}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
