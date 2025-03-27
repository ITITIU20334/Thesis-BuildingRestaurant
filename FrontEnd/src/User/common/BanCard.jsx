import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BanCard = ({ banTrong, dataDatBan }) => {
  const navigate = useNavigate();

  function handleChonBan(ban) {
    navigate(`/dat-ban/${ban.idBan}`, { state: { ban, dataDatBan } });
  }

  return (
    <Container>
      <h1>Empty Table</h1>
      <Row className="justify-content-start">
        {banTrong.length > 0 ? (
          banTrong.map((ban) => (
            <Col key={ban.idBan} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Card.Body>
                  <Card.Title>{ban.tenBan}</Card.Title>
                  <Card.Text>Table Position: {ban.viTri}</Card.Text>
                  <Card.Text>Number of Customers: {ban.soNguoi}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button
                    className="btn btn-primary"
                    onClick={() => handleChonBan(ban)}
                  >
                    Book Table
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <p>No Table Found</p>
        )}
      </Row>
    </Container>
  );
};

export default BanCard;
