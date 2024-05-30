import React from 'react';
 
interface QuestionProps {
  id: string;
  question: string;
  definition: string; 
  description: string;
  handleShowAnswer: () => void; 
}

const Question: React.FC<QuestionProps> = ({
  question,
  definition,
  description,
  handleShowAnswer,
}) => {
  return (
    <div className='question'>
      <h3>{question}</h3>
      <p>{definition}</p>
      <p>{description}</p>
      <button className='btn' onClick={handleShowAnswer}>Show Answer</button>
    </div>
  );
};

export default Question;
