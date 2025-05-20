import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function Cards({ quizzes }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      {quizzes.map((quiz) => (
        <Card key={quiz.id} style={{ width: '18rem' }}>
          <Card.Img src='/quiz.png' alt="Quiz" />
          <Card.Body style={{ textAlign: 'center' }}>
            <Card.Title>{quiz.titulo}</Card.Title>
            <Button
              variant="primary"
              onClick={() => navigate(`/quiz/${quiz.id}`)}>
              Ver perguntas
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cards;
