// pages/api/create-payment-intent.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { amount, currency, metadata } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // pence
    currency: 'gbp',
    metadata,
  });
  res.json({ clientSecret: paymentIntent.client_secret });
}