import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import CardPergunta from '../../components/Cardsperguntas/Cards';

const Paginaquiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleDelete = async () => {
    const confirm = window.confirm('Tem certeza que deseja excluir este quiz?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/quizzes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Quiz excluído com sucesso!');
      navigate('/');
    } catch (err) {
      console.error('Erro ao deletar quiz:', err);
      alert('Erro ao excluir quiz');
    }
  };

  if (loading) return <p>Carregando quiz...</p>;
  if (error) return <p>{error}</p>;
  if (!quiz) return <p>Quiz não encontrado.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{quiz.titulo}</h2>

      {isAdmin && (
        <button
          onClick={handleDelete}
          style={{
            marginBottom: '1rem',
            backgroundColor: 'red',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Excluir Quiz
        </button>
      )}

      <CardPergunta perguntas={quiz.questions} categoria={quiz.titulo} />
    </div>
  );
};

export default Paginaquiz;
