import '../styles/Footer.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faMedium } from '@fortawesome/free-brands-svg-icons';


function Footer() {
    return (
        <footer>
            <h3>About Me!</h3>
            <div className="socialContainer">
            <Link to="https://github.com/isinsuatay">
                    <FontAwesomeIcon icon={faGithub} />
                </Link>
                <Link to="https://www.linkedin.com/in/%C4%B1%C5%9F%C4%B1nsu-atay-948496299/">
                    <FontAwesomeIcon icon={faLinkedin} />
                </Link>
                <Link to="https://medium.com/@isinsu-atay">
                    <FontAwesomeIcon icon={faMedium} />
                </Link>

            </div>

        </footer>
    )
}

export default Footer
