import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/perfil");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      email: email,
      senha: senha
    };

    try {
      const response = await axios.post("http://localhost:8000/login", credentials, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.status === 200) {
        const token = response.data;
        localStorage.setItem("token", token);
        console.log(token)
        const decoded = jwtDecode(token);
        console.log("Token decodificado:", decoded);

        navigate("/perfil");
      } else {
        alert("Você não foi logado.");
        console.log("Erro na resposta:", response.status);
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      alert("Erro ao fazer login verifique suas credenciais.");
    }
  };

  return (
    <div>
      <form className='form-login' onSubmit={handleSubmit}>
        <div>
          <label className='label-login-text'>Faça o seu login</label>
          <label className='label-login-nome'>Email:</label>
          <input
            className='input-login-nome'
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Digite seu email'
          />
        </div>
        <div>
          <label className='label-senha-login'>Senha:</label>
          <input
            className='input-senha-login'
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder='Digite sua senha'
          />
        </div>
        <button className='button-login' type="submit">Login</button>
        <p className='p-login'>
          Não tem uma conta? <Link to="/registro">Registrar</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
