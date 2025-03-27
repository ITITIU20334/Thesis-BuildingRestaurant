import { Tab, Tabs } from "react-bootstrap";
import NavigationBar from "./common/NavigationBar";
import { useEffect, useState } from "react";
import { fetchAllDanhMuc } from "../services/DanhMucService";
import { fetchMonAnByLoai } from "../services/MonAnService";
import ProductGrid from "./common/MonAnMenu";
import { useNavigate } from "react-router-dom";
import Footer from "./common/Footer";

const Menu = () => {
  const [danhmucs, setDanhMuc] = useState([]);
  const [monans, setMonAn] = useState([]);
  const [activeKey, setActiveKey] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const danhMucResponse = await fetchAllDanhMuc();
        setDanhMuc(danhMucResponse.data);
        if (danhMucResponse.data.length > 0) {
          // Gọi listMonAn với id của danh mục đầu tiên nếu có
          setActiveKey(danhMucResponse.data[0].id_Loai);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (activeKey) {
      listMonAn(activeKey);
    }
  }, [activeKey]);

  function listMonAn(id) {
    fetchMonAnByLoai(id)
      .then((response) => {
        setMonAn(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    console.log(id);
  };

  return (
    <div>
      <NavigationBar />
      <div style={{ marginTop: "100px", marginBottom: "300px" }}>
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          {danhmucs.map((x) => (
            <Tab eventKey={x.id_Loai} title={x.tenLoai} key={x.id_Loai}>
              <div>
                {Array.isArray(monans) && monans.length > 0 && (
                  <ProductGrid
                    products={monans}
                    onProductClick={handleProductClick}
                  />
                )}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Menu;
