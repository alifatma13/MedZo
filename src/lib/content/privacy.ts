import type { PolicyContent } from "../../types/PolicyContent";

export const privacy: PolicyContent = {
  metaTitle: "Privacy Policy — MedZo",
  metaDescription: "MedZo's privacy policy — how we collect, use, and protect your information.",
  title: "Privacy Policy",
  lastUpdated: "May 2025",
  intro: "MedZo is committed to protecting the privacy of our clients and their patients. This policy explains what information we collect, how we use it, and your rights.",
  backLink: { label: "← Back to home", href: "/" },
  sections: [
    {
      heading: "Information We Collect",
      body: "We collect information you provide when signing up for MedZo services, including practice name, contact details, and billing information. We do not collect or store patient health records — that data remains on your own practice management systems.",
    },
    {
      heading: "How We Use Your Information",
      body: "Your information is used solely to deliver and improve MedZo services, communicate with you about your account, and comply with legal obligations under Australian law.",
    },
    {
      heading: "Data Storage and Security",
      body: "All data is stored on servers located in Australia and protected with industry-standard encryption. We do not sell or share your information with third parties except as required by law.",
    },
    {
      heading: "Your Rights",
      body: "You have the right to access, correct, or delete your personal information at any time. To exercise these rights, contact us at the email address below.",
    },
    {
      heading: "Contact",
      body: "For privacy-related enquiries, email hello@medzoweb.com.au. We aim to respond within 5 business days.",
    },
  ],
};
