import { useState } from 'react';

function QuizCreator() {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);


    const hanleSubmit = (e) => {
        e.preventDefault();
        console.log('Quiz Title:', quizTitle);
        console.log('Quiz Description:', quizDescription);
        console.log('Category:', category);
        console.log('File:', file);
    }

  return (
    <div className="container mt-4">
      <h1 className="text-center">Crie seu Quiz</h1>

      <h3>
        <label htmlFor="quizImage" className="form-label">
          Escolha a imagem do quiz
        </label>
      </h3>
      <div className="input-group mb-3">
        <input
          type="file"
          className="form-control"
          id="inputGroupFile04"
          aria-describedby="inputGroupFileAddon04"
          aria-label="Upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">
          Enviar
        </button>
      </div>

      <form>
        <div className="mb-3">
          <h3>
            <label htmlFor="quizTitle" className="form-label">
              Título do Quiz
            </label>
          </h3>
          <input
            type="text"
            className="form-control"
            id="quizTitle"
            placeholder="Digite o título"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <h3>
            <label htmlFor="quizDescription" className="form-label">
              Descrição
            </label>
          </h3>
          <textarea
            className="form-control"
            id="quizDescription"
            rows="2"
            placeholder="Descreva o quiz"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
          ></textarea>
        </div>

        <div id="questionsContainer">
          <div className="card mb-3">
            <div className="card-body">
              <h4>
                <label className="form-label">Pergunta 1</label>
              </h4>
              <input type="text" className="form-control mb-2" placeholder="Digite a pergunta" />

              {['A', 'B', 'C', 'D'].map((letter, index) => (
                <div className="form-check mb-2" key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="question1"
                    id={`q1a${index + 1}`}
                  />
                  <input
                    type="text"
                    className="form-control d-inline-block ms-2"
                    placeholder={`Alternativa ${letter}`}
                  />
                </div>
              ))}

              <div className="form-group mt-3">
                <h3>
                  <label className="form-label">Categoria</label>
                </h3>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Escolha uma categoria</option>
                  <option value="1">Anime</option>
                  <option value="2">Filme</option>
                  <option value="3">Jogo</option>
                  <option value="4">Livro</option>
                </select>
              </div>

              <div className="mt-3">
                <button onClick={hanleSubmit} type="submit" className="btn btn-primary me-2">
                  Salvar Quiz
                </button>
                <button  type="button" className="btn btn-danger">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default QuizCreator;
