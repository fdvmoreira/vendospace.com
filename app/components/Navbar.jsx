import Image from "next/legacy/image";
import Link from "next/link";
import { useLogin } from "../context/loginContext";


const Navbar = ({ props }) => {
  const [user, updateUser] = useLogin();
  // updateLogin(true);

  return (
    <nav className='navbar navbar-expand-lg shadow'>
      <div className='container-fluid'>
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
          {!user.loggedIn ? (
            <div className='d-flex-row justify-content-around '>
              <Link href='/login' className='btn btn-sm btn-outline-primary mx-1'>
                Login
              </Link>
              <Link href='/register' className='btn btn-sm btn-primary mx-1'>
                SignUp
              </Link>
            </div>
          ) : (
            <div className='dropdown'>
              {
                //TODO add component to create listing and auctions
              }
              <Link href={"/listings/create"} className='btn navbar-btn btn-primary'>
                Create listing
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
                  <Link href='/account/profile' className='dropdown-item'>
                    My account
                  </Link>
                </li>
                <div className="separator"></div>
                <li>
                  <Link
                    href='/'
                    onClick={(e) => {
                      updateUser({ ...user, loggedIn: false });
                    }}
                    className='dropdown-item'
                    >
                    Logout<i className='bi bi-box-arrow-right'></i>

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
