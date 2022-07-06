import { Row, Col, Button } from 'react-bootstrap';

const GameOptionsComp = ({ disks, reset, setDisks }) => {
  const confReset = () => {
    setDisks(3);
    console.log(reset);
    reset();
  };

  return (
    <Row>
      <Col>
        <span>Discos: {disks}</span>
        <Button
          variant="outline-secondary"
          onClick={() => {
            if (disks < 12) {
              setDisks((d) => d + 1);
            }
          }}
        >
          +
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => {
            if (disks > 0) {
              setDisks((d) => d - 1);
            }
          }}
        >
          -
        </Button>
      </Col>
      <Col>
        <Button variant="outline-secondary" onClick={confReset}>
          Reiniciar
        </Button>
        <Button variant="outline-secondary" onClick={() => console.log(disks)}>
          Resolver
        </Button>
      </Col>
    </Row>
  );
};

export default GameOptionsComp;
