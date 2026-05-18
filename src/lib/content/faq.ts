// faq.ts — FAQ item collection. Section heading lives in home.ts.
import type { FAQItem } from "../../types/FAQItem";

export const faqs: FAQItem[] = [
  {
    question: "How does MedZo handle practice management?",
    answer:
      "We offer a hybrid approach, combining high-level strategic planning with daily operational tasks like billing, HR, and compliance tailored specifically to your clinic's needs.",
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
      "We support a wide range of healthcare providers, from standard General Practices to complex surgical specialists and allied health clinics.",
  },
  {
    question: "What practice management software do you work with?",
    answer:
      "Our team is most experienced with Gentu, one of Australia's leading specialist practice management platforms. We also support other systems. Get in touch and we'll confirm compatibility with your setup.",
  },
];
