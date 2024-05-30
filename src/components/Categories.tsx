import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Categories.css';

interface Category {
  _id: string;
  name: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('http://localhost:8000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const fetchQuestionsByCategory = async (categoryId: string) => {
    try {
      const response = await axios.get<{ questions: any[] }>(`http://localhost:8000/categories/${categoryId}`);
      const { questions: categoryQuestions } = response.data;
      console.log('Category Questions:', categoryQuestions);
    } catch (error) {
      console.error('Error fetching questions by category:', error);
    }
  };

  return (
    <div className='cardContainer'>
      <div className='cardsContent'>
        {categories.map(category => (
          <li key={category._id} className='shine'>
            <Link to={`/categories/${category._id}`} onClick={() => fetchQuestionsByCategory(category._id)}>
              {category.name}
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Categories;
