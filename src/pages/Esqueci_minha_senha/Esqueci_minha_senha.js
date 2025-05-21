 import { useState } from 'react';
import axios from 'axios';

export default function Esqueci_senha() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/esqueci-senha', { email });
      setMensagem(res.data.mensagem);
    } catch (error) {
      setMensagem('Erro ao enviar email. Verifique se o email está cadastrado.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">Recuperar Senha</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Enviar link de recuperação</button>
        {mensagem && (
          <div className="alert alert-info text-center mt-3 p-2" role="alert">
            {mensagem}
          </div>
        )}
      </form>
    </div>
  );
}