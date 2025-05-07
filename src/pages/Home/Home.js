import React, { useState, useEffect } from 'react';
import Cards from '../../components/Cards/Cards';
import axios from 'axios';

const Home = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
    
    .then((response) => {
      setInfo(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error('Erro ao buscar dados:', error);
    });
  }, []);

  return (
    <div>
      <h1>Bem-vindo à página inicial!</h1>
      <Cards info={info} />
    </div>
  );
};

export default Home;
