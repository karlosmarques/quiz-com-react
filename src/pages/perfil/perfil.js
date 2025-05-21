import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [historico, setHistorico] = useState([]);      // Estado para armazenar o histórico de quizzes
  const [media, setMedia] = useState(0);               // Estado para armazenar a média de desempenho
  const navigate = useNavigate();

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const token = localStorage.getItem('token');

        // Busca dados básicos do usuário
        const usuarioResponse = await axios.get('http://localhost:8000/usuario', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsuario(usuarioResponse.data.usuario);

        // Busca histórico de quizzes e média de desempenho
        const historicoResponse = await axios.get('http://localhost:8000/historico', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setHistorico(historicoResponse.data.historico);
        setMedia(historicoResponse.data.media);

      } catch (error) {
        console.error("Erro ao buscar o perfil ou histórico:", error);
        navigate("/login"); // Redireciona para login se falhar (token inválido ou não autorizado)
      }
    };

    buscarDados();
  }, [navigate]);

  const Sair = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!usuario) {
    return <p>Carregando perfil...</p>;
  }

  return (
    <main style={{ paddingTop: '70px' }}>
      <div className="container text-center mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <img
              src="/thebruxo.png"
              className="rounded-circle mx-auto d-block mb-3"
              alt="Foto de perfil"
              style={{ width: '150px', height: '150px' }}
            />
            <h3>{usuario.nome}</h3>
            <p className="text-muted">{usuario.email}</p>

            <br /><br />

            <h4>Histórico de quizzes realizados:</h4>
            {historico.length === 0 ? (
              <p>Você ainda não realizou nenhum quiz.</p>
            ) : (
              <ul className="list-group mb-3">
                {historico.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{item.quiz.titulo}</span>
                    <span>Score: {item.score.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            )}

            <h4>Média de desempenho: {media.toFixed(2)}</h4>

            <br /><br />

            <div className="d-grid gap-2 d-md-block">
              <button onClick={Sair} className="btn btn-danger">
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Perfil;
