import React from 'react';
import Marquee from 'react-fast-marquee';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const FAQ: React.FC = () => {
   const faqs = [
      {
         id: 1,
         question: 'What is Turquioaz?',
         answer:
            'Turquioaz is a premium transportation service that offers a fleet of high-quality vehicles for your travel needs. Whether you are looking for a comfortable ride to the airport, a stylish car for a special occasion, or a reliable mode of transportation, Turquioaz has you covered.',
      },
      {
         id: 2,
         question: 'How do I look up my reservation?',
         answer:
            'To look up your reservation, simply log in to your Turquioaz account on our website or mobile app. Navigate to the "My Reservations" section, where you can view and manage all your upcoming and past reservations. If you encounter any issues, our customer support team is available 24/7 to assist you.',
      },
      {
         id: 3,
         question: 'How do I find my car?',
         answer:
            'Finding your Turquioaz car is easy! Once your reservation is confirmed, you will receive detailed instructions on where to meet your driver and locate your vehicle. Additionally, you can track the real-time location of your assigned car through the Turquioaz app for added convenience.',
      },
      {
         id: 4,
         question: 'Can I get a refund?',
         answer:
            'Yes, Turquioaz offers a flexible refund policy. If you need to cancel your reservation, please do so within the specified time frame mentioned in our cancellation policy to be eligible for a refund. You can find more details about our cancellation and refund policies on our website or by contacting our customer support team.',
      },
      {
         id: 5,
         question: 'When will my ride be ready?',
         answer:
            'Your Turquioaz ride will be ready at the scheduled time specified in your reservation. Our drivers are punctual and strive to provide a seamless experience. You can track the real-time location of your assigned vehicle through the Turquioaz app and expect it to arrive promptly at your designated pick-up location.',
      },
      {
         id: 6,
         question: 'Can I extend my reservation?',
         answer:
            'Yes, you can extend your Turquioaz reservation, provided there is availability. To extend your reservation, log in to your Turquioaz account and navigate to the "My Reservations" section. Select the reservation you wish to extend and follow the prompts to adjust the duration. Keep in mind that additional charges may apply for extended reservations.',
      },
      {
         id: 7,
         question: 'Can I change my reservation on the same day?',
         answer:
            'Changes to your Turquioaz reservation on the same day are subject to availability and may incur additional charges. To modify your reservation, log in to your Turquioaz account, go to the "My Reservations" section, and choose the reservation you want to change. Follow the provided options to make the necessary adjustments. For urgent changes, we recommend contacting our customer support team for assistance.',
      },
   ];

   return (
      <section id="faq" className="my-[2.5vh]">
         <Marquee speed={100}>
            <p className="phone:text-[15vh] tablet:text-[20vw] text-[#BBBBBB]/70 font-medium tracking-tighter uppercase overflow-y-hidden">
               Frequently Asked Questions&nbsp;
            </p>
         </Marquee>
         <motion.div className="pb-5 px-2 m-5 rounded border-[#303030] border border-dashed">
            {faqs.map(faq => (
               <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  viewport={{ once: true }}
               >
                  <Accordion type="single" collapsible className="w-[98%] phone:pt-1 tablet:pt-2 mx-auto">
                     <AccordionItem value="item-1">
                        <AccordionTrigger className="text-[#DEDEDE] font-normal phone:text-sm tablet:text-lg uppercase text-left">
                           {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-[#FAFAFA] phone:text-sm tablet:text-lg tracking-tighter">
                           {faq.answer}
                        </AccordionContent>
                     </AccordionItem>
                  </Accordion>
               </motion.div>
            ))}
         </motion.div>
      </section>
   );
};

export default FAQ;
