import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CardPergunta from '../../components/Cardsperguntas/Cards';

const QuizPage = () => {
  const { categoriaId, categoria} = useParams();
  const [perguntas, setPerguntas] = useState([]);

  useEffect(() => {
    axios.get('https://opentdb.com/api.php', {
      params: {
        amount: 10,
        category: categoriaId,
        type: 'multiple'
      }
    })
   .then((response) => {
      setPerguntas(response.data.results);
      console.log(response.data.results);
    }).catch((error) => {
      console.error('Erro ao buscar perguntas:', error);
    });
  }
  , [categoriaId]); 



  return (
   <CardPergunta perguntas={perguntas} categoria={categoria} />
  );
};

export default QuizPage;
