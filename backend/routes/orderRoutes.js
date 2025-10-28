const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { items } = req.body || [];
    const amount = (items.reduce((acc, item) => acc + item.price * (item.qty || 1), 0) * 100) || 0; // en centavos

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creando PaymentIntent:", error);
    res.status(500).send({ error: "Error en servidor al crear PaymentIntent" });
  }
});

module.exports = router;
