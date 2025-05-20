import React, { useState, useEffect } from 'react';
import './Cards.css';

const CardPergunta = ({ perguntas, categoria }) => {
  const [respostasSelecionadas, setRespostasSelecionadas] = useState({});
  const [acertos, setAcertos] = useState(0);
  const [perguntasEmbaralhadas, setPerguntasEmbaralhadas] = useState([]);

  useEffect(() => {
    // Para cada pergunta, embaralha as respostas (answers)
    const embaralhadas = perguntas.map((q) => {
      const todas = [...q.answers]; // array de respostas
      // embaralha array de respostas
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
    </div>
  );
};

export default CardPergunta;
