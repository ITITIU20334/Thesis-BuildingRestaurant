import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function ConfirmPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [message, setMessage] = useState("🔄...");
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/dondatban/confirm?token='+ token)
      .then(res => res.text())
      .then(msg => {
        setMessage(`✅ ${msg}`);
        setTimeout(() => {
          navigate("/"); // chuyển về trang chủ sau 3 giây
        }, 3000);
      })
      .catch(() => {
        setMessage("Error");
        setTimeout(() => {
          navigate("/"); // cũng chuyển về trang chủ sau 3 giây
        }, 3000);
      });
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{message}</h2>
      <p>Redirecting to the homepage...</p>
    </div>
  );
}

export default ConfirmPage;
