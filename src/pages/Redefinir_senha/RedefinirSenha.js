import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RedefinirSenha = () => {
  const { token } = useParams();
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      await axios.post(`http://localhost:8000/redefinir-senha/${token}`, {
        novaSenha,
      });
      setMensagem('Senha redefinida com sucesso!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error(err);
      setErro(err.response?.data?.message || 'Erro ao redefinir senha.');
    }
  };

  return (
    <main style={{ paddingTop: '70px' }}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center mb-4">Redefinir Senha</h2>
            {mensagem && <div className="alert alert-success">{mensagem}</div>}
            {erro && <div className="alert alert-danger">{erro}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nova Senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmar Nova Senha</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Redefinir Senha
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RedefinirSenha;
