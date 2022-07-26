import Image from "next/image";
import Link from "next/link";
import { useLogin } from "../context/loginContext";

import { ToastContainer, toast } from "react-toastify";

const Navbar = ({ props }) => {
  const [user, updateUser] = useLogin();
  // updateLogin(true);

  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container-fluid'>
        <Link href='/'>
          <a className='navbar-brand'>
            <Image src='/logo.jpeg' alt='logo' width='48' height='48' />
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
          {!user.loggedIn ? (
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
              {
                //TODO add component to create listing and auctions
              }
              <Link href={"/listings/create"}>
                <a className='btn navbar-btn btn-primary'>Create listing</a>
              </Link>
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
                <div className="separator"></div>
                <li>
                  <Link href='/'>
                    <a
                      onClick={(e) => {
                        updateUser({ ...user, loggedIn: false });
                      }}
                      className='dropdown-item'>
                      Logout&nbsp;<i className='bi bi-box-arrow-right'></i>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
