import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardPergunta = ({ perguntas, categoria }) => {
  const [respostasSelecionadas, setRespostasSelecionadas] = useState({});
  const [acertos, setAcertos] = useState(0);
  const [perguntasEmbaralhadas, setPerguntasEmbaralhadas] = useState([]);

  useEffect(() => {
    const embaralhadas = perguntas.map((q) => {
      const todas = [...q.answers];
      const respostasEmbaralhadas = todas.sort(() => Math.random() - 0.5);
      return { ...q, respostas: respostasEmbaralhadas };
    });
    setPerguntasEmbaralhadas(embaralhadas);
  }, [perguntas]);

  const handleResposta = (indice, respostaId, correta) => {
    if (respostasSelecionadas[indice]) return;

    setRespostasSelecionadas((prev) => ({ ...prev, [indice]: respostaId }));
    if (correta) setAcertos((prev) => prev + 1);
  };

  const quizId = perguntas.length > 0 ? perguntas[0].quiz_id : null;

  const enviarPontuacao = async () => {
    const token = localStorage.getItem('token');
    if (!quizId) return alert("Quiz ID não encontrado.");

    try {
      await axios.post(
        'http://localhost:8000/responder-quiz',
        { quiz_id: quizId, score: acertos },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Pontuação enviada!');
    } catch (error) {
      console.error('Erro ao enviar pontuação:', error);
      alert('Erro ao enviar pontuação. Tente novamente.');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Perguntas de {categoria}</h2>
      <div className="text-center mb-3 fw-bold">
        Acertos: {acertos} / {perguntas.length}
      </div>

      {perguntasEmbaralhadas.length === 0 && <p className="text-center">Carregando perguntas...</p>}

      <div className="row justify-content-center">
        {perguntasEmbaralhadas.map((questao, index) => (
          <div key={questao.id} className="col-md-8 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <p className="card-text fw-bold">{questao.texto}</p>
                <div className="d-grid gap-2">
                  {questao.respostas.map((resposta) => {
                    const selecionada = respostasSelecionadas[index];
                    let btnClass = 'btn-outline-secondary';

                    if (selecionada) {
                      if (resposta.correta) btnClass = 'btn-success';
                      else if (resposta.id === selecionada && !resposta.correta) btnClass = 'btn-danger';
                    }

                    return (
                      <button
                        key={resposta.id}
                        className={`btn ${btnClass}`}
                        onClick={() => handleResposta(index, resposta.id, resposta.correta)}
                        disabled={!!selecionada}
                      >
                        {resposta.texto}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {Object.keys(respostasSelecionadas).length === perguntas.length && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={enviarPontuacao}>
            Enviar pontuação
          </button>
        </div>
      )}
    </div>
  );
};

export default CardPergunta;
