import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import CardPergunta from '../../components/Cardsperguntas/Cards';

const Paginaquiz = () => {
  const { id } = useParams();
 
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const carregarQuiz = async () => {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          const decoded = jwtDecode(token);
          if (decoded.is_admin) {
            setIsAdmin(true);
          }
        }

        const response = await axios.get(`http://localhost:8000/quizzes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setQuiz(response.data.quiz);
      } catch (err) {
        console.error('Erro ao buscar quiz:', err);
        setError('Erro ao carregar quiz');
      } finally {
        setLoading(false);
      }
    };

    carregarQuiz();
  }, [id]);

  if (loading) return <p>Carregando quiz...</p>;
  if (error) return <p>{error}</p>;
  if (!quiz) return <p>Quiz não encontrado.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <CardPergunta perguntas={quiz.questions} categoria={quiz.titulo} />
    </div>
  );
};

export default Paginaquiz;
