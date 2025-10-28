import { useCart } from "../context/cartcontext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51SNI3eLNKZK9XJP7qkH1TiFYRxvukJFcBvRNCVxSJSEAhQnNKu1aBZMUEzAXBYpdHHSQxC1COX1cP3EzE6bDvrRg00Rniw7i7o"); 

function CheckoutForm({ cartItems }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/orders/create-payment-intent", {
        items: cartItems
      });
      const clientSecret = res.data.clientSecret;
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      });
      if (result.error) {
        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          alert("Pago realizado con éxito");
        }
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>Pagar</button>
    </form>
  );
}

export default function Cart() {
  const { state, dispatch } = useCart();

  return (
    <div>
      <h1>Carrito</h1>
      {state.cartItems.map(item => (
        <div key={item._id}>
          <p>{item.title} - ${item.price} x {item.qty}</p>
          <button onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item._id })}>Eliminar</button>
        </div>
      ))}
      <Elements stripe={stripePromise}>
        <CheckoutForm cartItems={state.cartItems} />
      </Elements>
    </div>
  );
}
