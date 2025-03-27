import React, { useEffect, useState } from "react";
import NavigationBar from "./common/NavigationBar";
import { Button, Col, Container, Row } from "react-bootstrap";
import { fetchMonNgauNhien } from "../services/MonAnService";
import ProductGrid from "./common/MonAnMenu";
import Footer from "./common/Footer";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [monans, setMonAn] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    listMonAn();
  }, []);
  const listMonAn = () => {
    fetchMonNgauNhien()
      .then((response) => {
        setMonAn(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    console.log(id);
  };

  return (
    <div>
      <NavigationBar />
      <div style={{ marginTop: "60px" }}>
        <div>
          <img
            src="http://res.cloudinary.com/dis3h8jsk/image/upload/v1735565614/uaqwz419wwsyzuocr93l.webp"
            alt=""
            style={{ height: "600px" }}
          />
        </div>
        <Container className="introduction">
          <Row>
            <Col>
              <h1>Welcome to</h1> <h2>Tie Restaurant</h2>
              <p>
                From the love Vietnamese cuisine, Tie Restaurant's menu 
                is all the passion we put into it: a variety of regional dishes, and
                more strictly, we have to preserve the original delicious flavor of each food.
              </p>
              <p>
              For nearly 30 years, we have proudly 
              welcomed many guests from home and abroad to enjoy with the simplest 
              motto: "Delicious food, Tie Restaurant".
              </p>
              <p>
                For Tie Restaurant, we always try to bring my customers the best experience in service 
                and atmosphere at the restaurant, so that you always feel satisfied after each time you come to us.
              </p>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <h2>Dishes</h2>
            </Col>

            <ProductGrid
              products={monans}
              onProductClick={handleProductClick}
            />
          </Row>
        </Container>
        <Container className="introduction">
          <Row>
            <Col>
              <h1>Dining</h1> <h2>Atmosphere</h2>
              <p>
              A complete delicious meal not only focuses on the quality of each food 
              but also the restaurant space is an important factor that affects your experience. 
              Therefore, the restaurant system not only focuses on the quality of the dishes and service, 
              Tie restaurant also focus on the space to create the most comfortable and enjoyable experience for you.
              </p>
              <p>
              With ancient house architecture, airy garden, always shaded by green trees, creating fresh air, is a 
              source of natural energy to help you relieve stress and fatigue. Every small corner of the restaurant 
              is carefully designed, bringing a nostalgic space of an old Vietnamese house that is both sophisticated, 
              elegant, close and rustic.
              </p>
            </Col>
            <Col>
              <img
                src="https://bizweb.dktcdn.net/100/442/328/themes/842729/assets/banner_left_1.png?1720517634021"
                alt="Không gian 1"
                className="intro-image"
              />
              <img
                src="https://bizweb.dktcdn.net/100/442/328/themes/842729/assets/banner_left_2.png?1720517634021"
                alt="Không gian 2"
                className="intro-image"
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
