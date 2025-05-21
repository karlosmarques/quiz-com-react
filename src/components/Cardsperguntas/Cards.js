import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cards.css';

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

    if (correta) {
      setAcertos((prev) => prev + 1);
    }
  };

  // Pega o quiz_id da primeira pergunta, assumindo que todas são do mesmo quiz
  const quizId = perguntas.length > 0 ? perguntas[0].quiz_id : null;

  const enviarPontuacao = async () => {
    const token = localStorage.getItem('token');

    if (!quizId) {
      alert("Quiz ID não encontrado.");
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/responder-quiz', // Ajuste para a rota correta do seu backend
        { quiz_id: quizId, score: acertos },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert('Pontuação enviada!');
    } catch (error) {
      console.error('Erro ao enviar pontuação:', error);
      alert('Erro ao enviar pontuação. Tente novamente.');
    }
  };

  return (
    <div className="container-perguntas">
      <h2 className="titulo-categoria">Perguntas de {categoria}</h2>
      <div className="acertos">
        Acertos: {acertos} / {perguntas.length}
      </div>

      {perguntasEmbaralhadas.length === 0 && <p>Carregando perguntas...</p>}

      {perguntasEmbaralhadas.map((questao, index) => (
        <div key={questao.id} className="card-pergunta">
          <p className="pergunta">{questao.texto}</p>
          <div className="respostas">
            {questao.respostas.map((resposta) => {
              const selecionada = respostasSelecionadas[index];
              let classe = '';

              if (selecionada) {
                if (resposta.correta) classe = 'correta';
                else if (resposta.id === selecionada && !resposta.correta) classe = 'errada';
              }

              return (
                <button
                  key={resposta.id}
                  className={`botao-resposta ${classe}`}
                  onClick={() => handleResposta(index, resposta.id, resposta.correta)}
                  disabled={!!selecionada}
                >
                  {resposta.texto}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Botão para enviar pontuação aparece só quando todas as perguntas foram respondidas */}
      {Object.keys(respostasSelecionadas).length === perguntas.length && (
        <button className="botao-enviar" onClick={enviarPontuacao}>
          Enviar pontuação
        </button>
      )}
    </div>
  );
};

export default CardPergunta;
