import React, { useState } from "react";
import { Container, Row, Col, Card, Nav, Button } from "react-bootstrap";

const BanCardAdmin = ({ bans, taoHoaDon, ChitetHDShow }) => {
  const [selectedPosition, setSelectedPosition] = useState("Ngoài sân");

  const handleSelect = (eventKey) => {
    setSelectedPosition(eventKey);
  };

  const filteredBans = bans.filter((ban) => ban.viTri === selectedPosition);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={3} className="ban-card-silde">
          <Nav
            variant="pills"
            className="flex-column mt-2"
            onSelect={handleSelect}
          >
            <Nav.Item>
              <Nav.Link
                eventKey="Outside"
                active={selectedPosition === "Outside"}
              >
                Outside
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="Inside"
                active={selectedPosition === "Inside"}
              >
                Inside
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="Upstairs"
                active={selectedPosition === "Upstairs"}
              >
                Upstairs
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col md={9}>
          <Row>
            {filteredBans.length > 0 ? (
              filteredBans.map((ban) => (
                <Col
                  key={ban.idBan}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title>{ban.tenBan}</Card.Title>
                      <Card.Text>Number of Customers: {ban.soNguoi}</Card.Text>
                      <Card.Text>Status: {ban.trangThai}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      {ban.trangThai === "Empty" ? (
                        <Button
                          variant="primary"
                          className="mr-2"
                          onClick={() => taoHoaDon(ban)}
                        >
                          Create Bill
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          onClick={() => ChitetHDShow(ban.idBan)}
                        >
                          View Bill
                        </Button>
                      )}
                    </Card.Footer>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p>Not Table Found</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default BanCardAdmin;
