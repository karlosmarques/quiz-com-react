import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function Cards({ info }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
      {info.map((item, key) => (
        <Card key={key} style={{ width: '18rem' }}>
          <Card.Img src='/quiz.png' alt="Quiz" />
          <Card.Body style={{ textAlign: 'center' }}>
            <Card.Title>{item.name}</Card.Title>
            <Button
              variant="primary"
              onClick={() => navigate(`/quiz/${item.id}/${(item.name)}`)}>
              Ver perguntas
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cards;

