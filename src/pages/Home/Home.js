import React, { useState, useEffect } from 'react';
import Cards from '../../components/Cards/Cards';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/quizzes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQuizzes(response.data.quizzes);
        console.log(response.data.quizzes);
      } catch (error) {
        console.error('Erro ao buscar quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className='home-container'>
      <h1 className='title-home'>Quizzes Disponíveis</h1>
      <Cards quizzes={quizzes} />
    </div>
  );
};

export default Home;
