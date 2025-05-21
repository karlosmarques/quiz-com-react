// Paginaquiz.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardPergunta from '../../components/Cardsperguntas/Cards';

const Paginaquiz = () => {
  const { id } = useParams(); // pega o ID da rota
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const Quiz = async () => {
      try {
        const token = localStorage.getItem('token');
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

    Quiz();
  }, [id]);

  if (loading) return <p>Carregando quiz...</p>;
  if (error) return <p>{error}</p>;
  if (!quiz) return <p>Quiz não encontrado.</p>;
  console.log(quiz);
  return (
    <div style={{ padding: '2rem' }}>
      <h2>{quiz.titulo}</h2>
      <CardPergunta perguntas={quiz.questions} categoria={quiz.titulo} />
    </div>
  );
};

export default Paginaquiz;
