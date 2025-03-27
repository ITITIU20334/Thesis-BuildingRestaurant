import React, { useEffect, useState } from "react";
import ProductGrid from "./common/MonAnMenu";
import { useNavigate, useParams } from "react-router-dom";
import { timKiemMonAn } from "../services/MonAnService";
import NavigationBar from "./common/NavigationBar";

const TimKiemMonAnPage = () => {
  const { tim } = useParams();
  const [monans, setMonAn] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listMonAn(tim);
  }, [tim]);

  const listMonAn = (tim) => {
    timKiemMonAn(tim)
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
      <h2 style={{ marginTop: "100px" }}>Search results for: {tim}</h2>
      <div style={{ marginTop: "100px" }}>
        {Array.isArray(monans) && monans.length > 0 ? (
          <ProductGrid products={monans} onProductClick={handleProductClick} />
        ) : (
          <div>Not found</div>
        )}
      </div>
    </div>
  );
};

export default TimKiemMonAnPage;
