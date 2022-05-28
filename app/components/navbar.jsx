import Image from "next/image";
import Link from "next/link";
import { useLogin } from "../context/loginContext";

import { ToastContainer, toast } from "react-toastify";

const Navbar = ({ props }) => {
  const [login, updateLogin] = useLogin();
  updateLogin(true);

  const notify = () => toast("Wow so easy!");

  const toast_ = () => {
    toast("Hello world!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <nav className='navbar navbar-expand-lg '>
      <div className='container-fluid'>
        <Link href='/'>
          <a className='navbar-brand'>
            <Image src='/logo.jpeg' alt='logo' width='64' height='64' />
          </a>
        </Link>

        <a
          className='navbar-toggler'
          href='#'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='bi bi-list'></span>
        </a>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          {!login ? (
            <div className='d-flex-row justify-content-around '>
              <Link href='/login'>
                <a className='btn btn-sm btn-outline-primary mx-1'>Login</a>
              </Link>
              <Link href='/register'>
                <a className='btn btn-sm btn-primary mx-1'>SignUp</a>
              </Link>
            </div>
          ) : (
            <div className='dropdown'>
              <a
                className='btn navbar-btn btn-secondary dropdown-toggle'
                id='dropdownMenuButton'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                <i className='bi bi-person'></i>
                {props?.user?.name || "John Doe"}
              </a>
              <ul
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'>
                <li>
                  <Link href='/account/profile'>
                    <a className='dropdown-item'>My account</a>
                  </Link>
                </li>
                <li>
                  <Link href='/'>
                    <a
                      onClick={(e) => {
                        updateLogin(false);
                      }}
                      className='dropdown-item'>
                      Logout&nbsp;<i className='bi bi-box-arrow-right'></i>
                    </a>
                  </Link>
                </li>
              </ul>

              <button onClick={toast_}>Notify!</button>
              <ToastContainer />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
