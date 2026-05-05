import type { ServiceCard } from "../../types/ServiceCard";
import type { SectionHeading } from "../../types/SectionHeading";

export const servicesHeading: SectionHeading = {
  title: "What does MedZo do?",
  body: "We offer tailored support that scales with your practice, ensuring clinical precision and administrative ease.",
};

export const services: ServiceCard[] = [
  {
    iconName: "monitor",
    title: "Virtual Practice Management",
    description:
      "Scale your practice with expert remote management that handles operations from anywhere in Australia.",
  },
  {
    iconName: "home",
    title: "Onsite Practice Management",
    description:
      "Dedicated professionals who integrate directly into your physical clinic for hands-on operational leadership.",
  },
  {
    iconName: "file-text",
    title: "Medical Billing Services",
    description:
      "Streamlined Medicare, DVA, and private health billing to maximize revenue and minimize claim rejections.",
  },
  {
    iconName: "users",
    title: "HR and Recruitment",
    description:
      "Find the right clinical and administrative talent to grow your medical team with confidence.",
  },
  {
    iconName: "bar-chart",
    title: "Healthcare Finance",
    description:
      "Specialized bookkeeping and financial reporting designed for the unique needs of medical practices.",
  },
  {
    iconName: "shield-check",
    title: "Compliance & Risk",
    description:
      "Stay ahead of AHPRA regulations and healthcare standards with our expert compliance audits.",
  },
];
