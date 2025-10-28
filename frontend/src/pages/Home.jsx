import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/cartcontext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { state, dispatch } = useCart();

  useEffect(() => {
    axios.get("http://localhost:4000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
    toast.success(`${product.title} agregado al carrito`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Celulares</h1>

      {/* 🛒 Contador del carrito */}
      <p style={{
        background: "#f5f5f5",
        padding: "10px",
        borderRadius: "10px",
        display: "inline-block",
        fontWeight: "bold"
      }}>
        🛍️ Productos en el carrito: {state.cartItems.length}
      </p>

      <div style={{ marginTop: "20px" }}>
        {products.map(p => (
          <div key={p._id} style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "10px"
          }}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p><strong>${p.price}</strong></p>
            <button onClick={() => addToCart(p)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}
