import { Row, Col, Button } from "react-bootstrap";

const GameOptionsComp = ({ disks, reset, setDisks, solve }) => {
  const confReset = () => {
    setDisks(3);
    reset(true);
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
        <Button variant="outline-secondary" onClick={solve}>
          Resolver
        </Button>
      </Col>
    </Row>
  );
};

export default GameOptionsComp;
