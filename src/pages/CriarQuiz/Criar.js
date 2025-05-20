import { useState } from "react";
import axios from "axios";

export default function CreateQuiz() {
  const [titulo, setTitulo] = useState("");

  // Função que cria 4 objetos de respostas distintas
  const criarRespostasIniciais = () => [
    { texto: "", correta: false },
    { texto: "", correta: false },
    { texto: "", correta: false },
    { texto: "", correta: false }
  ];

  const [perguntas, setPerguntas] = useState([
    {
      texto: "",
      respostas: criarRespostasIniciais()
    }
  ]);

  const adicionarPergunta = () => {
    if (perguntas.length < 10) {
      setPerguntas([
        ...perguntas,
        { texto: "", respostas: criarRespostasIniciais() }
      ]);
    }
  };

  const excluirPergunta = (index) => {
    if (perguntas.length > 1) {
      const novasPerguntas = [...perguntas];
      novasPerguntas.splice(index, 1);
      setPerguntas(novasPerguntas);
    }
  };

  const atualizarTextoPergunta = (index, texto) => {
    const novasPerguntas = [...perguntas];
    novasPerguntas[index].texto = texto;
    setPerguntas(novasPerguntas);
  };

  const atualizarTextoResposta = (indexPergunta, indexResposta, texto) => {
    const novasPerguntas = [...perguntas];
    novasPerguntas[indexPergunta].respostas[indexResposta] = {
      ...novasPerguntas[indexPergunta].respostas[indexResposta],
      texto
    };
    setPerguntas(novasPerguntas);
  };

  const marcarRespostaCorreta = (indexPergunta, indexResposta) => {
    const novasPerguntas = [...perguntas];
    novasPerguntas[indexPergunta].respostas = novasPerguntas[
      indexPergunta
    ].respostas.map((resposta, i) => ({
      ...resposta,
      correta: i === indexResposta
    }));
    setPerguntas(novasPerguntas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      // Criar o quiz
      const quizResponse = await axios.post(
        "http://localhost:8000/quizzes",
        { titulo },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const quizId = quizResponse.data.quiz.id;

      //Criar perguntas e respostas
      for (const pergunta of perguntas) {
        const perguntaResponse = await axios.post(
          "http://localhost:8000/questions",
          {
            quiz_id: quizId,
            texto: pergunta.texto
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const perguntaId = perguntaResponse.data.question.id;

        for (const resposta of pergunta.respostas) {
          await axios.post(
            "http://localhost:8000/answers",
            {
              question_id: perguntaId,
              texto: resposta.texto,
              correta: resposta.correta
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
        }
      }

      alert("Quiz criado com sucesso!");
      setTitulo("");
      setPerguntas([
        {
          texto: "",
          respostas: criarRespostasIniciais()
        }
      ]);
    } catch (error) {
      console.error(error);
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

        {perguntas.map((pergunta, indexPergunta) => (
          <div key={indexPergunta} className="card mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <label className="form-label mb-0">
                  Pergunta {indexPergunta + 1}
                </label>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => excluirPergunta(indexPergunta)}
                  disabled={perguntas.length === 1}
                >
                  Excluir Pergunta
                </button>
              </div>

              <input
                type="text"
                className="form-control mb-3"
                value={pergunta.texto}
                onChange={(e) =>
                  atualizarTextoPergunta(indexPergunta, e.target.value)
                }
                required
              />

              {pergunta.respostas.map((resposta, indexResposta) => (
                <div
                  key={indexResposta}
                  className="mb-2 d-flex align-items-center"
                >
                  <input
                    type="text"
                    className="form-control me-2"
                    value={resposta.texto}
                    onChange={(e) =>
                      atualizarTextoResposta(
                        indexPergunta,
                        indexResposta,
                        e.target.value
                      )
                    }
                    placeholder={`Resposta ${indexResposta + 1}`}
                    required
                  />
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`correta-${indexPergunta}`}
                      checked={resposta.correta}
                      onChange={() =>
                        marcarRespostaCorreta(indexPergunta, indexResposta)
                      }
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
