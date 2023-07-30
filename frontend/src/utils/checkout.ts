import { Response } from "express";
import { selectedDay, selectedModel } from "../pages/Model";
import { createSignal } from "solid-js";

const express = require("express");
const cors = require("cors")
const checkout = express();
const Stripe = require("stripe");

checkout.use(cors());
const Key = import.meta.env.VITE_STRIPE_SECRET_KEY;
const stripe = new Stripe(Key, {
  apiVersion: "2022-11-15",
});

checkout.post("/create-checkout-session", async (req: Request, res: Response) => {

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: selectedModel!.name,
          },
          unit_amount: selectedModel!.rentPrice * 100,
        },
        quantity: selectedDay(),
      },
    ],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    mode: "payment",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/collections`,
  });

  if (session.url) {
    window.location.href = session.url;
  } else {
    console.error(
      "Error creating Stripe Checkout session: Session URL is null."
    );
  }
  res.redirect(303, session.url);
});

export default checkout;
