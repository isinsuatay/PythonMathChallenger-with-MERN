import { useState } from 'react';
import LetterPuzzle from '../components/LetterPuzzle';
import PyramidGame from '../components/PyramidGame/NumberPyramid';

function GameScreen() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const componentsPerPage: number = 1;

  const allComponents: JSX.Element[] = [<LetterPuzzle key={1} />, <PyramidGame key={2} />];

  const indexOfLastComponent: number = currentPage * componentsPerPage;
  const indexOfFirstComponent: number = indexOfLastComponent - componentsPerPage;
  const currentComponents: JSX.Element[] = allComponents.slice(indexOfFirstComponent, indexOfLastComponent);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='gameContainer'>
      <ul className="pagination">
        {allComponents.map((_, index) => (
          <li key={index} className={`page-item ${index === currentPage - 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      {currentComponents}
    </div>
  );
}

export default GameScreen;
