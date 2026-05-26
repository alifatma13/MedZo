// faq.ts — FAQ item collection. Section heading lives in home.ts.
import type { FAQItem } from "../../types/FAQItem";

export const faqs: FAQItem[] = [
  {
    question: "How does MedZo handle practice management?",
    answer:
      "We start with a consultation to map your workflows and pain points, then put the right people in place to handle your billing, admin, compliance, and staff management. From there, we stay involved with weekly reporting and monthly reviews.",
  },
  {
    question: "What is the cost of your services?",
    answer:
      "Our pricing is modular. You only pay for the services you need, whether it's a full-service management package or specific billing support.",
  },
  {
    question: "Can you manage my practice remotely?",
    answer:
      "Yes, our Virtual Practice Management team uses secure cloud-based systems to handle administrative and operational tasks for clinics across Australia.",
  },
  {
    question: "Which clinical specialties do you support?",
    answer:
      "We work with General Practices, medical specialists, allied health, dental, physiotherapy, psychology, radiology, pathology, telehealth providers, and multidisciplinary clinics across Australia.",
  },
  {
    question: "What practice management software do you work with?",
    answer:
      "Our team is most experienced with Gentu, one of Australia's leading specialist practice management platforms. We also support other systems. Get in touch and we'll confirm compatibility with your setup.",
  },
];
