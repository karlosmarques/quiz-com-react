import React, { useState, useEffect } from 'react';
import Cards from '../../components/Cards/Cards';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    axios.get('https://opentdb.com/api_category.php')
    .then((response) => {
     setInfo(response.data.trivia_categories);
     console.log(response.data.trivia_categories);
    })
    .catch((error) => {
      console.error('Erro ao buscar categorias:', error);
    }
  );

}, []);

  return (
    <div className='home-container'>
      <h1 className='title-home'>Bem-vindo à página inicial!</h1>
      <Cards info={info} />
    </div>
  );
};

export default Home;
