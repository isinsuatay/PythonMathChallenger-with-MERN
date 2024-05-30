import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForwardStep, faForward, faBackwardStep, faBackward } from '@fortawesome/free-solid-svg-icons';
import '../styles/Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationButtons = () => {
    const pageButtons = [];
    const maxPageButtons = 3;

    if (currentPage > 1) {
      pageButtons.push(
        <button key={1} onClick={() => onPageChange(1)}>
          <FontAwesomeIcon icon={faBackward} />
        </button>
      );
    }
    if (currentPage > 1) {
      pageButtons.push(
        <button key="prev" onClick={() => onPageChange(currentPage - 1)}>
          <FontAwesomeIcon icon={faBackwardStep} />
        </button>
      );
    }

    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
    if (currentPage === 1) {
      endPage = Math.min(totalPages, maxPageButtons);
    } else if (currentPage === totalPages) {
      startPage = Math.max(1, totalPages - maxPageButtons + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
     <button key={`button-${i}`} onClick={() => onPageChange(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      pageButtons.push(
        <button key="next" onClick={() => onPageChange(currentPage + 1)}>
          <FontAwesomeIcon icon={faForwardStep} />
        </button>
      );
    }
    if (currentPage !== totalPages) {
      pageButtons.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)}>
          <FontAwesomeIcon icon={faForward} />
        </button>
      );
    }

    return pageButtons;
  };

  return <div className='pagination'>{renderPaginationButtons()}</div>;
};

export default Pagination;
