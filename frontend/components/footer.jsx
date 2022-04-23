
export default function Footer() {
  return (
    <footer className="row">
        <div className="col">
            <h6>Contact</h6>
            <ul className="nav">
                <li className="nav-item"><i className="bi bi-email"></i>support@vendospace.com</li>
                <li className="nav-item"></li>
            </ul>
        </div>
        <div className="col">
            <h6>Follow Us</h6>
            <ul className="nav flex-column">
                <li className="nav-item"><a href="#" className="nav-link"><i className="bi bi-twitter"></i> Twitter</a></li>
                <li className="nav-item"><a href="#" className="nav-link"><i className="bi bi-facebook"></i> Facebook</a></li>
                <li className="nav-item"><a href="#" className="nav-link"><i className="bi bi-instagram"></i> Instagram</a></li>
                <li className="nav-item"><a href="#" className="nav-link"><i className="bi bi-linkedin"></i> LinkedIn</a></li>
            </ul>
        </div>
        <div className="col">
            <h6>Useful Links </h6>
            <ul className="nav flex-column">
                <li className="nav-item"><a href="#" className="nav-link"><i className="bi"></i>Team</a></li>
                <li className="nav-item"><a href="#" className="nav-link"><i className="bi"></i>Blog</a></li>
                <li className="nav-item"><a href="#" className="nav-link"><i className="bi"></i>Testimonials</a></li>
                <li className="nav-item"><a href="#" className="nav-link"><i className="bi"></i>FAQ</a></li>
            </ul>
        </div>

        <span className="text-muted bg-dark text-white align-items-end" > vendospace &copy; 2022 </span>
    </footer>
  )
}
