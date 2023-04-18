import Image from "next/legacy/image";
import Link from "next/link";
import { useAuth } from "../context/authContext";
import ActionMenu from "./menus/ActionMenu";


const Navbar = ({ props }) => {
  const [auth, updateAuth] = useAuth();

  const logOut = (event) =>{
    updateAuth({
      isAuthenticated: false,
      user: null,
      token: null 
    });
  }

  return (
    <nav className='navbar navbar-expand-lg'>
      <div className='container d-flex flex-row justify-content-between'>
        <Link href='/' className='navbar-brand alg'>
          <Image src='/logo.jpeg' alt='logo' width='48' height='48' />
        </Link>
        <div className="d-flex gap-2">
        <a
          className='navbar-toggler order-2'
          href='#'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='bi bi-list'></span>
        </a>
        <div className="d-flex justify-content-end">
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            {!auth?.isAuthenticated ? (
            <div className='d-flex flex-row gap-2'>
              <Link href='/login' className='btn btn-sm btn-outline-primary'>
                Login
              </Link>
              <Link href='/register' className='btn btn-sm btn-primary'>
                SignUp
              </Link>
            </div>
          ) : (
            <div className='dropdown d-flex gap-2'>
              <ActionMenu />
              <a
                className='btn navbar-btn btn-sm btn-secondary dropdown-toggle'
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
                  <Link href='/account/my' className='dropdown-item'>
                    My account
                  </Link>
                </li>
                <div className="separator"></div>
                <li>
                  <Link href='/' className='dropdown-item' onClick={logOut}>
                    Logout&nbsp;
                    <i className='bi bi-box-arrow-right'></i>
                    </Link>
                </li>
              </ul>
            </div>
          )}
          </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
