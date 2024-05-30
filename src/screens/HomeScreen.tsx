import FlyingCards from '../components/FlyingCards';
import Calculator from '../components/Calculator';
import Categories from '../components/Categories';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function HomeScreen() {
  return (
    <>
      <FlyingCards />
      <Categories />
      <div className="calculatorClass">
        <div className="textContainer">
          <div className="title">Scientific Calculator</div>
          <div className="sub-title">
            <p>
            Easily perform complex mathematical operations. Master mathematics with graphical and numerical computation capabilities.
            </p>
            <br />
            <Link to='/calculator'>
            <button>
            <FontAwesomeIcon icon={faArrowRight} />
            </button>
           </Link>
          </div>
        </div>
        <Calculator />
      </div>
    </>
  )
}

export default HomeScreen
