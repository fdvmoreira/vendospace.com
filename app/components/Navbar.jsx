import Image from "next/legacy/image";
import Link from "next/link";
import { useAuth } from "../context/authContext";
import ActionMenu from "./menus/ActionMenu";


const Navbar = ({ props }) => {
  const [auth, updateAuth] = useAuth();

  return (
    <nav className='navbar navbar-expand-lg shadow'>
      <div className='container'>
        <Link href='/' className='navbar-brand cursor-pointer'>
          <Image src='/logo.jpeg' alt='logo' width='48' height='48' />
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
          {!auth.isAuthenticated ? (
            <div className='d-flex'>
              <Link href='/login' className='btn btn-sm btn-outline-primary mx-1'>
                Login
              </Link>
              <Link href='/register' className='btn btn-sm btn-primary mx-1'>
                SignUp
              </Link>
            </div>
          ) : (
            <div className='dropdown'>
              <ActionMenu />
              <a
                className='btn navbar-btn btn-secondary dropdown-toggle'
                id='dropdownMenuButton'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                <i className='bi bi-person'>&nbsp;</i>
                {auth?.user?.name}
              </a>
              <ul
                className='dropdown-menu'
                aria-labelledby='dropdownMenuButton'>
                <li>
                  <Link href='/account/profile' className='dropdown-item'>
                    My account
                  </Link>
                </li>
                <div className="separator"></div>
                <li>
                  <Link
                    href='/'
                    onClick={(e) => {
                      updateAuth({isAuthenticated: false, token: null, user: null });
                    }}
                    className='dropdown-item'
                    >
                    Logout&nbsp;<i className='bi bi-box-arrow-right'></i>

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
