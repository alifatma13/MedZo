// privacy.ts — full Privacy Policy content: meta tags, intro, policy sections, and FAQs.
import type { PolicyContent } from "../../types/PolicyContent";
import { BACK_TO_HOME, SITE_DOMAIN } from "./site";

export const privacy: PolicyContent = {
  metaTitle: "Privacy Policy | MedZo",
  metaDescription: "How MedZo collects, uses, and protects your information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.",
  title: "Privacy Policy",
  lastUpdated: "May 2025",
  intro: "MedZo Pty Ltd ('MedZo', 'we', 'us') is bound by the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth). This policy explains what personal information we collect, why we collect it, how we protect it, and your rights as a client or website visitor.",
  backLink: BACK_TO_HOME,
  sections: [
    {
      heading: "1. Who We Are",
      body: "MedZo provides end-to-end medical practice management services, including billing, scheduling, and operational support, for healthcare practices across Australia. We are a service provider to your practice; we are not a healthcare provider and do not offer clinical services.",
    },
    {
      heading: "2. Information We Collect",
      body: "We collect personal information necessary to deliver our services: the names, contact details, and billing information of practice owners and administrators; usage data generated when you interact with our platform (log data, device information, feature usage); and correspondence you send us. We do not collect, access, or store patient health records, clinical notes, or Medicare data; that information remains on your practice's own systems at all times.",
    },
    {
      heading: "3. How We Use Your Information",
      body: "We use your information to set up and manage your MedZo account; deliver, operate, and improve our services; send service notifications and support communications; process invoices and payments; and comply with our legal obligations under Australian law. We do not use your information for third-party marketing and will not sell your data under any circumstances.",
    },
    {
      heading: "4. Disclosure to Third Parties",
      body: "We may disclose your information to trusted third-party service providers (such as cloud hosting and payment processors) who assist us in operating our platform, under strict confidentiality obligations. We may also disclose information where required by law, court order, or a government or regulatory authority. Outside of these circumstances, your information is not shared.",
    },
    {
      heading: "5. Data Storage and Security",
      body: "All data is stored on servers located within Australia. We protect your information using industry-standard encryption in transit and at rest, role-based access controls, and regular security reviews. In the event of a data breach likely to cause serious harm, we will notify affected individuals and the Office of the Australian Information Commissioner (OAIC) under the Notifiable Data Breaches scheme.",
    },
    {
      heading: "6. Data Retention",
      body: "We retain your personal information for as long as your account is active and for seven years following termination of services, as required under Australian financial and record-keeping obligations. Upon a verified request, we will delete or de-identify information that is no longer required, subject to any outstanding legal obligations.",
    },
    {
      heading: "7. Cookies and Analytics",
      body: "Our website uses cookies and analytics tools to understand how visitors interact with our site and to improve the user experience. No personally identifiable information is collected through cookies without your consent. You may disable cookies through your browser settings, though some site functionality may be affected.",
    },
    {
      heading: "8. Your Rights",
      body: "Under the Privacy Act 1988 (Cth) and the APPs, you have the right to request access to the personal information we hold about you; request corrections to inaccurate or incomplete information; request deletion of your information where we have no legal obligation to retain it; and lodge a complaint if you believe we have handled your information in breach of the APPs.",
    },
    {
      heading: "9. Contact and Complaints",
      body: `To exercise any of the above rights, or for any privacy-related enquiry, contact our Privacy Officer at privacy@${SITE_DOMAIN}. We will acknowledge your request within 2 business days and aim to resolve it within 30 days. If you are not satisfied with our response, you may lodge a complaint with the OAIC at www.oaic.gov.au or by calling 1300 363 992.`,
    },
    {
      heading: "10. Changes to This Policy",
      body: `We may update this policy from time to time to reflect changes in our services or legal requirements. The current version is always available at ${SITE_DOMAIN}/privacy. We will notify active clients of material changes by email.`,
    },
  ],
  faqs: [
    {
      question: "Do you store patient health records or clinical data?",
      answer: "No. Patient health records, clinical notes, and Medicare data remain entirely on your practice's own systems. MedZo never accesses or holds this information.",
    },
    {
      question: "Is my data stored in Australia?",
      answer: "Yes. All data is stored on servers located within Australia. We do not transfer personal information overseas.",
    },
    {
      question: "Who within MedZo can access my practice's data?",
      answer: "Access is restricted to authorised MedZo personnel on a strict need-to-know basis, enforced through role-based access controls and audit logging.",
    },
    {
      question: "What happens if there is a data breach?",
      answer: "If a breach is likely to result in serious harm, we will notify you and the OAIC as required under the Notifiable Data Breaches scheme within the Privacy Act 1988 (Cth).",
    },
    {
      question: "Can I request that my data be deleted?",
      answer: `Yes. Contact privacy@${SITE_DOMAIN} with a deletion request. We will action verified requests within 30 days, subject to any legal retention obligations.`,
    },
    {
      question: "Do you sell or share my data for marketing purposes?",
      answer: "No. We do not sell, rent, or share your personal information with third parties for marketing purposes under any circumstances.",
    },
  ],
};
