import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container py-5">
      <h1 className="text-center mb-4">Quizzes Disponíveis</h1>

      <div className="row justify-content-center">
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 col-xl-3 mb-4" key={quiz.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center">{quiz.titulo}</h5>

                  <img
                    src="../quiz.png"alt="Quiz"className="img-fluid mb-3"/>

                  <p className="card-text">{quiz.descricao}</p>

                  <div className="mt-auto d-grid gap-2">
                    <a href={`/quiz/${quiz.id}`} className="btn btn-primary">
                      Iniciar
                    </a>
                    {isAdmin && (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(quiz.id)}
                      >
                        Excluir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p className="text-muted">Nenhum quiz disponível.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
