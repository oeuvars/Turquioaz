import { useState } from 'react';
import Stripe from 'stripe';
import axios from 'axios';
import { loginCookie, registerCookie, headers } from '@/utils/authHeader';
import { Model } from '@/types/DataTypes';
import { useNavigate } from 'react-router-dom';

export const useStripeCheckout = () => {
   const [loadingSession, setLoadingSession] = useState(false);

   const createCheckoutSession = async (
      model: Model,
      days: number,
      startDate: Date,
      endDate: Date,
      navigate: ReturnType<typeof useNavigate>,
      showToast: (message: string, success: boolean) => void,
   ) => {
      const Key = import.meta.env.VITE_STRIPE_SECRET_KEY;
      const stripe = new Stripe(Key, {
         apiVersion: '2023-10-16',
      });

      if (days <= 0) {
         showToast('Not possible', false);
         return;
      }

      if (loginCookie || registerCookie) {
         setLoadingSession(true);
         try {
            const session = await stripe.checkout.sessions.create({
               payment_method_types: ['card'],
               line_items: [
                  {
                     price_data: {
                        currency: 'usd',
                        product_data: {
                           name: model.name,
                        },
                        unit_amount: model.rent * 100,
                     },
                     quantity: days,
                  },
               ],
               shipping_address_collection: {
                  allowed_countries: ['US'],
               },
               mode: 'payment',
               success_url: `${window.location.origin}/order-confirmation?success=true&id=${model?.id}`,
            });

            const response = await axios.post(
               `${import.meta.env.VITE_SERVER_URL}/user/rent-car/${model.id}`,
               {
                  startDate: startDate.toISOString().split('T')[0],
                  endDate: endDate.toISOString().split('T')[0],
                  status: false,
               },
               { headers },
            );

            const idToken = response.data.token;
            localStorage.setItem('idToken', idToken);

            if (session.url) {
               window.location.href = session.url;
            }
         } catch (error) {
            showToast('Something went wrong', false);
            console.error(error);
         } finally {
            setLoadingSession(false);
         }
      } else {
         navigate('/auth/login');
      }
   };

   return { createCheckoutSession, loadingSession };
};
