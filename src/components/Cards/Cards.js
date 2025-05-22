import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Cards = ({ quizzes, onDelete, isAdmin }) => {
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="col-md-4 mb-4 d-flex justify-content-center">
            
            <div className="card h-100 shadow-sm text-center" style={{ width: '18rem' }}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <img 
                  src="../quiz.png" 
                  alt="Imagem do Quiz" 
                  className="mb-3" 
                  style={{ width: '100%'}} 
                />
                <h5 className="card-title">{quiz.titulo}</h5>

                <button
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                  className="btn btn-primary mt-3"
                  style={{ width: '100%' }}
                >
                  Ver Quiz
                </button>

                {isAdmin && (
                  <button
                    onClick={() => onDelete(quiz.id)}
                    className="btn btn-danger mt-2"
                    style={{ width: '100%' }}
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
