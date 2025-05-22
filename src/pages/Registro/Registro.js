import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState("1");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tipoUsuarioBoolean = tipoUsuario === "2";

    const credentials = {
      nome,
      email,
      senha,
      datanascimento: dataNascimento,
      is_admin: tipoUsuarioBoolean
    };

    try {
      const response = await axios.post('http://localhost:8000/registro', credentials);

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      alert('Erro ao registrar usuário. Tente novamente mais tarde.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}
    >
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Cadastrar-se</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome:</label>
            <input
              id="nome"
              type="text"
              className="form-control"
              required
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              id="email"
              type="email"
              className="form-control"
              required
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha:</label>
            <input
              id="senha"
              type="password"
              className="form-control"
              required
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="dataNascimento" className="form-label">Data de Nascimento:</label>
            <input
              id="dataNascimento"
              type="date"
              className="form-control"
              required
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="tipoUsuario" className="form-label">Tipo de Usuário:</label>
            <select
              id="tipoUsuario"
              className="form-select"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
            >
              <option value="1">Aluno</option>
              <option value="2">Administrador</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
