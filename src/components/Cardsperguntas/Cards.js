import React, { useState, useEffect } from 'react';
import './Cards.css';

const CardPergunta = ({ perguntas, categoria }) => {
  const [respostasSelecionadas, setRespostasSelecionadas] = useState({});
  const [acertos, setAcertos] = useState(0);
  const [perguntasEmbaralhadas, setPerguntasEmbaralhadas] = useState([]);

  useEffect(() => {
    const embaralhadas = perguntas.map((q) => {
      const todas = [...q.incorrect_answers, q.correct_answer];
      const embaralhadas = todas.sort(() => Math.random() - 0.5);
      return { ...q, respostas: embaralhadas };
    });
    setPerguntasEmbaralhadas(embaralhadas);
  }, [perguntas]);

  const handleResposta = (indice, resposta, correta) => {
    if (respostasSelecionadas[indice]) return;

    setRespostasSelecionadas((prev) => ({ ...prev, [indice]: resposta }));

    if (resposta === correta) {
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
        <div key={index} className="card-pergunta">
          <p className="pergunta" dangerouslySetInnerHTML={{ __html: questao.question }} />
          <div className="respostas">
            {questao.respostas.map((resposta, i) => {
              const selecionada = respostasSelecionadas[index];
              const correta = questao.correct_answer;
              let classe = '';

              if (selecionada) {
                if (resposta === correta) classe = 'correta';
                else if (resposta === selecionada && resposta !== correta) classe = 'errada';
              }

              return (
                <button
                  key={i}
                  className={`botao-resposta ${classe}`}
                  onClick={() => handleResposta(index, resposta, correta)}
                  disabled={!!selecionada}
                  dangerouslySetInnerHTML={{ __html: resposta }}
                />
              );
            })}
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default CardPergunta;
