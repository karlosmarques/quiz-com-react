import React, { useState, useEffect } from 'react';
import Cards from '../../components/Cards/Cards';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // adicionado
import './Home.css';

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        if (decoded.is_admin) {
          setIsAdmin(true);
        }

        const response = await axios.get('http://localhost:8000/quizzes', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setQuizzes(response.data.quizzes);
      } catch (error) {
        console.error('Erro ao buscar quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este quiz?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/quizzes/${quizId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Quiz excluído com sucesso!');
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== quizId));
    } catch (error) {
      console.error('Erro ao excluir quiz:', error);
      alert('Erro ao excluir quiz');
    }
  };

  return (
    <div className='home-container'>
      <h1 className='title-home'>Quizzes Disponíveis</h1>
      <Cards quizzes={quizzes} onDelete={handleDelete} isAdmin={isAdmin} />
    </div>
  );
};

export default Home;
