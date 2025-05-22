import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="d-flex justify-content-center align-items-center bg-white min-vh-100">
      <div className="card p-4 shadow" style={{ minWidth: '350px', maxWidth: '400px', width: '100%' }}>
        <h3 className="card-title mb-4 text-center">Faça o seu login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha:</label>
            <input
              id="senha"
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">Login</button>
        </form>
        <p className="mt-3 text-center">
          Não tem uma conta? <Link to="/registro">Registrar</Link>
        </p>
        <p className="text-center">
          <Link to="/esqueci_minha_senha">Esqueci minha senha</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
