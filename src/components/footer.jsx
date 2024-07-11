import "../styles/Footer.css";
import LinkedIn from "../assets/linkedin.png";
import Github from "../assets/github.png";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="social-media">
                <a href="https://www.linkedin.com/in/lance-davenport-a845361b9/">
                    <img 
                        src={LinkedIn} 
                        alt="LinkedIn"
                        className="social-icon"
                        />
                </a>
                <a href="https://github.com/lancedavenport">
                    <img 
                        src={Github} 
                        alt="Github"
                        className="social-icon"/>
                </a>
            </div>
            <p className='text-footer'>© 2024 Lance Davenport</p>
            </footer>
    )
}