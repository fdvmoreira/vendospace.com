const Footer = () => {
  return (
    <footer className='text-decoration-none mt-auto container-fluid row bg-light d-flex justify-content-between'>
      <div className='col'>
        <h6>Contact</h6>
        <ul className='nav'>
          <li className='nav-item'>
            <i className='bi bi-envelope'></i> support@vendospace.com
          </li>
          <li className='nav-item'></li>
        </ul>
      </div>
      <div className='col'>
        <h6>Follow Us</h6>
        <ul className='nav flex-column'>
          <li className='nav-item'>
            <a href='#' className='nav-link'>
              <i className='bi bi-twitter'></i> Twitter
            </a>
          </li>
          <li className='nav-item'>
            <a href='#' className='nav-link'>
              <i className='bi bi-facebook'></i> Facebook
            </a>
          </li>
          <li className='nav-item'>
            <a href='#' className='nav-link'>
              <i className='bi bi-instagram'></i> Instagram
            </a>
          </li>
          <li className='nav-item'>
            <a href='#' className='nav-link'>
              <i className='bi bi-linkedin'></i> LinkedIn
            </a>
          </li>
        </ul>
      </div>
      <div className='col'>
        <h6>Useful Links </h6>
        <ul className='nav flex-column'>
          <li className='nav-item'>
            <a href='#' className='nav-link'>
              <i className='bi bi-people-fill'></i>Team
            </a>
          </li>
          <li className='nav-item'>
            <a href='#' className='nav-link'>
              <i className='bi bi-newspaper'></i> Blog
            </a>
          </li>
          <li className='nav-item'>
            <a href='#' className='nav-link'>
              <i className='bi bi-star-half'></i> Testimonials
            </a>
          </li>
          <li className='nav-item'>
            <a href='#' className='nav-link'>
              <i className='bi bi-question-circle'></i> FAQ
            </a>
          </li>
        </ul>
      </div>

      <span className='text-center text-muted'>
        &copy; vendospace.com 2023, All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
