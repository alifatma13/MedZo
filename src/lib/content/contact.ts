// contact.ts — developer-owned contact page strings only.
// CMS-managed fields (hero heading/body, trust points, office locations)
// are fetched exclusively from Sanity — edit them in Sanity Studio.
import type { ContactContent } from "../../types/pages";

export const contact: ContactContent = {
	hero: {
		trustAriaLabel: "Why contact us",
	},
	form: {
		heading: "Send us a message",
		body: "Fill in the form below and one of our specialists will get back to you within one business day.",
		fields: {
			name:    { label: "Your name",      placeholder: "Dr. Jane Smith"            },
			email:   { label: "Email address",  placeholder: "jane@yourpractice.com.au"  },
			phone:   { label: "Phone number",   placeholder: "+61 4XX XXX XXX"           },
			message: { label: "Message",        placeholder: "Tell us a bit about your practice and how we can help…" },
			defaultSubject: "Practice Management Enquiry",
			submit:         "Send message",
			sendingLabel:   "Sending…",
			errors: {
				nameRequired:    "Please enter your name.",
				nameMin:         "Name must be at least 2 characters.",
				emailRequired:   "Please enter your email address.",
				emailInvalid:    "Please enter a valid email address.",
				phoneRequired:   "Please enter your phone number.",
				phoneInvalid:    "Please enter a valid phone number.",
				messageRequired: "Please enter a message.",
				messageMin:      "Message must be at least 10 characters.",
				suspicious:      "Your input contains characters that are not allowed.",
				submitFailed:    "We're sorry, something went wrong on our end. Please try again in a moment, or call us directly and we'll be happy to help.",
			},
			successHeading: "Message sent!",
			successBody:    "Thanks for reaching out. One of our team will be in touch within one business day.",
		},
	},
};
