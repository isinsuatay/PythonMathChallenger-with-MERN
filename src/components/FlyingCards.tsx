import React, { useEffect, useState, useRef } from 'react';
import '../styles/FlyingCards.css';
import { Link } from 'react-router-dom';

const FlyingCards: React.FC = () => {
  const [cards, setCards] = useState<NodeListOf<Element> | null>(null);
  const scrollHandlerRef = useRef<EventListener | null>(null);

  useEffect(() => {
    const cardsList = document.querySelectorAll('.card');
    setCards(cardsList);
  }, []);

  const rotateCards = () => {
    let angle = 0;
    cards?.forEach((card) => {
      if (card.classList.contains('active')) {
        card.setAttribute(
          'style',
          `transform: translate(-50%, -120vh) rotate(-48deg);`
        );
      } else {
        card.setAttribute(
          'style',
          `transform: translate(-50%, -50%) rotate(${angle}deg);`
        );
        angle = angle - 10;
      }
    });
  };

  useEffect(() => {
    rotateCards();
  }, [cards]);

  const handleScroll = () => {
    const stackArea = document.querySelector('.cardsArea');
    if (!stackArea || !cards) return;

    const proportion = stackArea.getBoundingClientRect().top / window.innerHeight;
    if (proportion <= 0) {
      const n = cards.length;
      const index = Math.ceil((proportion * n) / 2);
      const newIndex = Math.abs(index) - 1;
      for (let i = 0; i < n; i++) {
        if (i <= newIndex) {
          cards[i].classList.add('active');
        } else {
          cards[i].classList.remove('active');
        }
      }
      rotateCards();
    }
  };

  useEffect(() => {
    scrollHandlerRef.current = handleScroll;
    window.addEventListener('scroll', scrollHandlerRef.current);
    return () => {
      if (scrollHandlerRef.current) {
        window.removeEventListener('scroll', scrollHandlerRef.current);
      }
    };
  }, [cards]);

  return (
    <div className="flyingCards">
      <div className="cardsArea">
        <div className="left">
          <div className="title">Welcome to PythMatic!</div>
          <div className="sub-title">
            PythMatic is a gateway for anyone eager to explore the exciting world of mathematics and algorithms. This platform offers a range of features, including a live Python Compiler, a scientific calculator, and various levels of algorithms and math problems. PythMatic encourages practice, enabling users to master math and enhance their programming skills. Take a step into the realms of math and coding with PythMatic and start your exploration today!
          </div>
        </div>
        <div className="right">
          <div className="cards">
            <div className="card">
              <h2>Different Algorithms and Math Problems</h2>
              <p>A variety of difficulty levels for algorithms and math problems.
                Improve your skills and learn new concepts through practice.</p>
            </div>
            <div className="card">
              <h2>Live Python Compiler</h2>
              <p>A live coding environment to enhance your Python skills.
                Start typing right away and see instant results.
              </p>
              <button className='cardsBtn'>
                <Link to='/compiler'>
                  Compiler
                </Link>
              </button>
            </div>
            <div className="card">
              <h2>Scientific Calculator</h2>
              <p>Easily perform complex mathematical operations.
                Master mathematics with graphical and numerical computation capabilities.
              </p>
              <button className='cardsBtn'>
                <Link to='/calculator'>
                  Calculator
                </Link>
              </button>
            </div>
            <div className="card">
              <h2>Opportunity for Practice</h2>
              <p>Practice with real-life examples to strengthen your skills.
                Test yourself in algorithm and math domains with Python.</p>
              <button className='cardsBtn'>
                <Link to='/games'>
                  Games
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlyingCards;
