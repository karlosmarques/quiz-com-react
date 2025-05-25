import { useState } from "react";
import axios from "axios";

export default function CreateQuiz() {
  const [titulo, setTitulo] = useState("");

  const criarRespostasIniciais = () =>
    Array(4).fill({ texto: "", correta: false });

  const [perguntas, setPerguntas] = useState([
    { texto: "", respostas: criarRespostasIniciais() }
  ]);

  const adicionarPergunta = () => {
    if (perguntas.length < 10) {
      setPerguntas([...perguntas, { texto: "", respostas: criarRespostasIniciais() }]);
    }
  };

  const excluirPergunta = (index) => {
    if (perguntas.length > 1) {
      setPerguntas(perguntas.filter((_, i) => i !== index));
    }
  };

  const atualizarTextoPergunta = (index, texto) => {
    const novas = [...perguntas];
    novas[index].texto = texto;
    setPerguntas(novas);
  };

  const atualizarTextoResposta = (iPerg, iResp, texto) => {
    const novas = [...perguntas];
    novas[iPerg].respostas[iResp] = {
      ...novas[iPerg].respostas[iResp],
      texto
    };
    setPerguntas(novas);
  };

  const marcarRespostaCorreta = (iPerg, iCorreta) => {
    const novas = [...perguntas];
    novas[iPerg].respostas = novas[iPerg].respostas.map((r, i) => ({
      ...r,
      correta: i === iCorreta
    }));
    setPerguntas(novas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        "http://localhost:8000/quizzes",
        { titulo },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      for (const p of perguntas) {
        const { data: perguntaData } = await axios.post(
          "http://localhost:8000/questions",
          { quiz_id: data.quiz.id, texto: p.texto },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        for (const r of p.respostas) {
          await axios.post(
            "http://localhost:8000/answers",
            {
              question_id: perguntaData.question.id,
              texto: r.texto,
              correta: r.correta
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }

      alert("Quiz criado com sucesso!");
      setTitulo("");
      setPerguntas([{ texto: "", respostas: criarRespostasIniciais() }]);
    } catch (err) {
      console.error(err);
      alert("Erro ao criar o quiz. Verifique o console.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Criar Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título do Quiz</label>
          <input
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        {perguntas.map((pergunta, iPerg) => (
          <div key={iPerg} className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <label className="form-label mb-0">Pergunta {iPerg + 1}</label>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => excluirPergunta(iPerg)}
                  disabled={perguntas.length === 1}
                >
                  Excluir Pergunta
                </button>
              </div>

              <input
                type="text"
                className="form-control mb-3"
                value={pergunta.texto}
                onChange={(e) => atualizarTextoPergunta(iPerg, e.target.value)}
                required
              />

              {pergunta.respostas.map((resposta, iResp) => (
                <div key={iResp} className="mb-2 d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={resposta.texto}
                    onChange={(e) =>
                      atualizarTextoResposta(iPerg, iResp, e.target.value)
                    }
                    placeholder={`Resposta ${iResp + 1}`}
                    required
                  />
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={`correta-${iPerg}`}
                      checked={resposta.correta}
                      onChange={() => marcarRespostaCorreta(iPerg, iResp)}
                    />
                    <label className="form-check-label">Correta</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-outline-success me-2"
          onClick={adicionarPergunta}
          disabled={perguntas.length >= 10}
        >
          + Adicionar Pergunta
        </button>

        <button type="submit" className="btn btn-primary">
          Criar Quiz
        </button>
      </form>
    </div>
  );
}
