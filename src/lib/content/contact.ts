// contact.ts — all content for the /contact page: meta tags, hero, enquiry form, team members, and office locations.
import type { ContactContent } from "../../types/ContactContent";

export const contact: ContactContent = {
	meta: {
		title: "Contact MedZo | Book a Consult",
		description:
			"Get in touch with the MedZo team. Book a free consult, send us a message, or visit our offices in NSW and QLD.",
	},
	hero: {
		heading: "Get in touch",
		body: "Whether you're ready to book a consult or just want to learn more, our practice management experts are here to help.",
		trust: [
			"We respond within 1 business day",
			"Serving practices Australia-wide",
			"Free initial consultation",
		],
		trustAriaLabel: "Why contact us",
	},
	form: {
		heading: "Send us a message",
		body: "Fill in the form below and one of our specialists will get back to you within one business day.",
		fields: {
			name: { label: "Your name", placeholder: "Dr. Jane Smith" },
			email: {
				label: "Email address",
				placeholder: "jane@yourpractice.com.au",
			},
			phone: {
				label: "Phone number",
				placeholder: "+61 4XX XXX XXX",
			},
			message: {
				label: "Message",
				placeholder:
					"Tell us a bit about your practice and how we can help…",
			},
			defaultSubject: "Practice Management Enquiry",
			submit: "Send message",
			errors: {
				nameRequired: "Please enter your name.",
				nameMin: "Name must be at least 2 characters.",
				emailRequired: "Please enter your email address.",
				emailInvalid: "Please enter a valid email address.",
				phoneRequired: "Please enter your phone number.",
				phoneInvalid: "Please enter a valid phone number.",
				messageRequired: "Please enter a message.",
				messageMin: "Message must be at least 10 characters.",
				suspicious: "Your input contains characters that are not allowed.",
				submitFailed: "We're sorry, something went wrong on our end. Please try again in a moment, or call us directly and we'll be happy to help.",
			},
			successHeading: "Message sent!",
			successBody:
				"Thanks for reaching out. One of our team will be in touch within one business day.",
		},
	},
	offices: {
		heading: "Our offices",
		body: "MedZo operates across Australia with physical offices in New South Wales and Queensland.",
		locations: [
			{
				state: "NSW",
				suburb: "Sydney",
				address: "330 Church Street\nParramatta NSW 2150",
				phone: "0478 811 242",
				email: "nsw@medzo.com.au",
			},
		],
		comingSoon: {
			badge: "Coming Soon",
			heading: "Expanding Soon",
			body: "We are growing across Australia. New locations are on the way - stay tuned.",
		},
	},
};
