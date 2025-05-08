import React from 'react';

const CardPergunta = ({ perguntas, categoria }) => {
    return (
        <div style={{ padding: '2rem' }}>
        <h2>Perguntas de {categoria}</h2>
        {perguntas.map((questao, key) => (
          <div key={key} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
            <p dangerouslySetInnerHTML={{ __html: questao.question }} />
            
          </div>
        ))}
      </div>
    );
};

export default CardPergunta;