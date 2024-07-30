import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Question from '../components/Question';
import Pagination from '../components/Pagination';
import Answer from '../components/Answer';
import CodeEditor from '../components/CodeEditor';
import '../styles/QuestionAnswer.css';
import '../styles/CustomSyntaxHighlighter.css';



interface QuestionData {
  _id: string;
  question: string;
  definition: string;
  description: string;
  answers: string[];
}

const QuestionAnswerPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const codeEditorRef = useRef<{ resetEditor: () => void }>(null);
  const answersRef = useRef<HTMLDivElement>(null);

  const questionsPerPage = 1;

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchCategoryData = async () => {
      try {
       
        const categoryQuestionsResponse = await axios.get(`http://localhost:8000/categories/${categoryId}/questions`);
        const categoryQuestions: QuestionData[] = categoryQuestionsResponse.data;
        setQuestions(categoryQuestions);
        if (selectedQuestionId) {
          fetchAnswers(selectedQuestionId);
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [categoryId, selectedQuestionId]);

  const fetchAnswers = async (questionId: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/categories/${categoryId}/questions/${questionId}/answers`);
      const { data } = response;
      const processedAnswers: string[] = data.map((item: any) => item.answer);
      setAnswers(processedAnswers);
      setSelectedQuestionId(questionId);
      if (answersRef.current) {
        answersRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error fetching or processing answers:', error);
    }
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedQuestionId(null);
    setAnswers([]);
    if (codeEditorRef.current) {
      codeEditorRef.current.resetEditor();
    }
    setCopied(false);
  };

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  return (
    <div className='questionAnswerContainer'>
      {currentQuestions.map((question, index) => (
        <div className='questionContainer' key={index}>
          <Question
            id={question._id}
            question={question.question}
            definition={question.definition}
            description={question.description}
            handleShowAnswer={() => {
              setSelectedQuestionId(question._id);
              fetchAnswers(question._id);
            }}
          />
          {selectedQuestionId === question._id && question.answers && (
            question.answers.map((answer, answerIndex) => (
              <Answer key={answerIndex} answer={answer} />
            ))
          )}
        </div>
      ))}
      <Pagination
        key={`pagination-${currentPage}`}
        currentPage={currentPage}
        totalPages={Math.ceil(questions.length / questionsPerPage)}
        onPageChange={onPageChange}
      />

      <CodeEditor ref={codeEditorRef} />

      <div ref={answersRef} className='answer'>
        {answers.map((answer, index) => (
          <li key={index} className='code-block-container'>
            <CopyToClipboard text={answer} onCopy={() => setCopied(true)} >
              <button className='copy-button'>{copied ? 'Copied' : 'Copy'}</button>
            </CopyToClipboard>
            <SyntaxHighlighter language="bash" style={okaidia} className="code-block">
              {answer}
            </SyntaxHighlighter>
          </li>
        ))}
      </div>
    </div>
  );
};

export default QuestionAnswerPage;