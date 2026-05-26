// servicepages.ts — full content for all three service detail pages.
// Swap the static objects below for CMS fetcher calls when ready — no component changes needed.
import type { ServicePageContent } from "../../types/ServicePage";
import { ui } from "./ui";
import receptionistImg from "../../res/virtual_receptionist.png";
import managerialImg from "../../res/practice_manager.png";
import billingImg from "../../res/billing.png";

export const servicePages: Record<string, ServicePageContent> = {
  "virtual-receptionist": {
    slug: "virtual-receptionist",
    metaTitle: "Virtual Medical Receptionist | MedZo",
    metaDescription:
      "Remote front-desk support covering appointment scheduling, patient coordination, billing and compliance, all handled professionally so you can focus on patient care.",
    heroLabel: "Virtual Medical Receptionist",
    heroHeading: "Never miss a patient, a booking, or a call",
    heroIntro:
      "Our virtual receptionists work inside your practice system, handling every patient interaction with the same care and professionalism you would expect from an in-clinic team member.",
    heroCtaLabel: "Book a consult",
    heroCtaHref: "/contact",
    heroImage: receptionistImg,
    featuresEyebrow: ui.featuresEyebrow,
    featuresHeading: "Everything your front desk handles, done remotely",
    featuresIntro:
      "From the first patient call to the final invoice, every touchpoint is covered.",
    features: [
      {
        iconName: "calendar",
        title: "Appointment Scheduling",
        body: "Your calendar always up to date. Bookings, reschedules, and cancellations handled instantly, with confirmations and reminders sent automatically.",
      },
      {
        iconName: "phone-call",
        title: "Patient Communication",
        body: "Every patient call answered professionally. Enquiries about fees, procedures, and appointments handled with warmth and care.",
      },
      {
        iconName: "clipboard",
        title: "Clinical Coordination",
        body: "Referrals processed, records updated, and hospitals coordinated so your clinical workflow never skips a beat.",
      },
      {
        iconName: "credit-card",
        title: "Billing & Invoicing",
        body: "Invoices out, gap payments explained, health fund claims handled. Patients understand what they owe and why.",
      },
      {
        iconName: "video",
        title: "Telehealth Support",
        body: "Virtual consultations coordinated end-to-end so both you and your patients are ready before the call starts.",
      },
      {
        iconName: "lock",
        title: "Privacy & Compliance",
        body: "Patient data handled with strict confidentiality. You stay covered under Australian healthcare regulations without lifting a finger.",
      },
    ],
    ctaHeading: "Ready to free up your time?",
    ctaBody: "Let our team handle the admin while you focus on patient care.",
    ctaLabel: "Book a consult",
    ctaHref: "/contact",
  },

  "managerial-support": {
    slug: "managerial-support",
    metaTitle: "Managerial Support | MedZo",
    metaDescription:
      "Practice-level oversight covering staff leadership, workflow optimisation, reporting and compliance, all managed by our expert team so you can focus on patients.",
    heroLabel: "Managerial Support",
    heroHeading: "Less admin. Better operations.",
    heroIntro:
      "Run a better practice without the burden of running it yourself. Our practice managers take ownership of your operations, leading your team, improving workflows, and keeping everything running so you can spend your time where it matters most.",
    heroCtaLabel: "Book a consult",
    heroCtaHref: "/contact",
    heroImage: managerialImg,
    featuresEyebrow: ui.featuresEyebrow,
    featuresHeading: "Practice-wide oversight, handled end to end",
    featuresIntro:
      "Every operational detail managed so nothing slips through the cracks.",
    features: [
      {
        iconName: "users",
        title: "Staff Management",
        body: "Your front-desk and admin team supervised, supported, and developed so the patient experience stays consistently excellent.",
      },
      {
        iconName: "settings",
        title: "Workflow Optimisation",
        body: "Scheduling bottlenecks, inefficiencies, and urgent rescheduling handled with calm, organised precision.",
      },
      {
        iconName: "link",
        title: "Stakeholder Liaison",
        body: "Clear communication maintained with hospitals, referring GPs, and specialists so everyone in your patient's care network stays aligned.",
      },
      {
        iconName: "bar-chart",
        title: "Weekly Reporting",
        body: "A weekly snapshot of appointment volumes, staff performance, and billing activity so you always know where your practice stands.",
      },
      {
        iconName: "eye",
        title: "Monthly Reviews",
        body: "A monthly deep-dive into practice performance, workflow efficiency, and compliance, with clear action points coming out of every session.",
      },
      {
        iconName: "sliders",
        title: "Policies & Compliance",
        body: "Practice documentation kept current and operations run in full alignment with healthcare regulations.",
      },
    ],
    ctaHeading: "Take back your time",
    ctaBody: "From staff management to reporting and compliance, your practice manager handles the operations so you can focus entirely on patients.",
    ctaLabel: "Book a consult",
    ctaHref: "/contact",
  },

  "billing-support": {
    slug: "billing-support",
    metaTitle: "Billing Support | MedZo",
    metaDescription:
      "End-to-end billing management covering Medicare, DVA, WorkCover, and private health fund claims, handled accurately and on time so your practice gets paid every time.",
    heroLabel: "Billing Support",
    heroHeading: "Get paid accurately, on time, every time",
    heroIntro:
      "Stop leaving money on the table. Our billing specialists handle every claim and chase every unpaid account so you get paid.",
    heroCtaLabel: "Book a consult",
    heroCtaHref: "/contact",
    heroImage: billingImg,
    featuresEyebrow: ui.featuresEyebrow,
    featuresHeading: "Complete billing management, nothing left behind",
    featuresIntro:
      "Every claim submitted, every payment reconciled, every account followed up.",
    features: [
      {
        iconName: "file-text",
        title: "Procedure Billing",
        body: "Every procedure billed correctly across private, public, and rural settings, with accurate item codes and compliance checks before submission.",
      },
      {
        iconName: "send",
        title: "Claims Submission",
        body: "Medicare, DVA, WorkCover, and private health fund claims submitted end-to-end, with unpaid claims actively monitored.",
      },
      {
        iconName: "dollar-sign",
        title: "Payments & Reconciliation",
        body: "Payments allocated and reconciled promptly so you always have a clear, accurate picture of your financial position.",
      },
      {
        iconName: "alert-circle",
        title: "Outstanding Accounts",
        body: "Unpaid accounts tracked and followed up so revenue does not slip through the cracks.",
      },
      {
        iconName: "shield-check",
        title: "Debt Collection",
        body: "Professional, sensitive debt coordination. We handle the difficult conversations so you do not have to.",
      },
    ],
    ctaHeading: "Maximise your practice revenue",
    ctaBody:
      "Our billing specialists ensure every claim is accurate and every payment is collected.",
    ctaLabel: "Book a consult",
    ctaHref: "/contact",
  },
};
