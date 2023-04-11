
import Footer from './footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="d-flex flex-column min-vh-100">
        {children}
      </div>
      <Footer />
    </>
  );
}
export default Layout;