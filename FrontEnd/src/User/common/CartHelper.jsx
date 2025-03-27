export const getCart = () => {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// Lưu giỏ hàng vào localStorage
export const saveCart = (cart) => {
  console.log("he");
  sessionStorage.setItem("cart", JSON.stringify(cart));
};
