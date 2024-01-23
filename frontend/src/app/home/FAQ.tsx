import React from 'react'
import Marquee from 'react-fast-marquee'
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
 } from "@/components/ui/accordion"

const FAQ:React.FC = () => {

  const faqs = [
    {
      id: 1,
      question: "What is Turquioaz?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, nostrum enim. Nesciunt, quam libero id architecto dolore facere veniam, nemo nihil, autem aliquid qui vitae!"
    },
    {
      id: 2,
      question: "How do I look up my reservation?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, nostrum enim. Nesciunt, quam libero id architecto dolore facere veniam, nemo nihil, autem aliquid qui vitae!"
    },
    {
      id: 3,
      question: "How do I find my car?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, nostrum enim. Nesciunt, quam libero id architecto dolore facere veniam, nemo nihil, autem aliquid qui vitae!"
    },
    {
      id: 4,
      question: "Can I get a refund?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, nostrum enim. Nesciunt, quam libero id architecto dolore facere veniam, nemo nihil, autem aliquid qui vitae!"
    },
    {
      id: 5,
      question: "When will my ride be ready?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, nostrum enim. Nesciunt, quam libero id architecto dolore facere veniam, nemo nihil, autem aliquid qui vitae!"
    },
    {
      id: 6,
      question: "Can I extend my reservation?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, nostrum enim. Nesciunt, quam libero id architecto dolore facere veniam, nemo nihil, autem aliquid qui vitae!"
    },
    {
      id: 7,
      question: "Can I change my reservation on the same day?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, nostrum enim. Nesciunt, quam libero id architecto dolore facere veniam, nemo nihil, autem aliquid qui vitae!"
    },
  ]
  return (
    <section id='faq' className='my-[2.5vh]'>
      <Marquee speed={100}>
         <p className='phone:text-[15vh] tablet:text-[20vw] text-[#BBBBBB]/70 font-medium tracking-tighter uppercase overflow-y-hidden'>Frequently Asked Questions&nbsp;</p>
      </Marquee>
      {faqs.map((faq) => (
        <div key={faq.id}>
          <Accordion type="single" collapsible className='w-[95%] mx-auto'>
            <AccordionItem value="item-1">
              <AccordionTrigger className='text-[#DEDEDE] font-normal phone:text-sm tablet:text-lg uppercase'>{faq.question}</AccordionTrigger>
              <AccordionContent className='text-[#DEDEDE] phone:text-sm tablet:text-lg'>{faq.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </section>
  )
}

export default FAQ
