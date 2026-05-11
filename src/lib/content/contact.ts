import type { ContactContent } from "../../types/ContactContent";

export const contact: ContactContent = {
	meta: {
		title: "Contact MedZo — Book a Consult",
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
				submitFailed: "We're sorry — something went wrong on our end. Please try again in a moment, or call us directly and we'll be happy to help.",
			},
			successHeading: "Message sent!",
			successBody:
				"Thanks for reaching out. One of our team will be in touch within one business day.",
		},
	},
	team: {
		heading: "Meet the team",
		body: "Our specialists bring years of combined experience across Australian healthcare settings.",
		members: [
			{
				initials: "SR",
				name: "Sarah Reynolds",
				role: "Head of Practice Operations",
				bio: "With over 12 years in medical administration, Sarah leads our onsite and virtual practice management programs across Australia.",
				imageUrl: "https://i.pravatar.cc/280?img=47",
			},
			{
				initials: "JK",
				name: "James Kim",
				role: "Senior Billing Specialist",
				bio: "James specialises in Medicare and DVA billing optimisation, helping practices recover revenue and reduce claim rejection rates.",
				imageUrl: "https://i.pravatar.cc/280?img=11",
			},
			{
				initials: "PL",
				name: "Priya Lawson",
				role: "HR & Recruitment Lead",
				bio: "Priya connects healthcare practices with the right clinical and administrative talent, from GPs to practice managers.",
				imageUrl: "https://i.pravatar.cc/280?img=45",
			},
			{
				initials: "MW",
				name: "Michael Walsh",
				role: "Compliance & Risk Advisor",
				bio: "Michael keeps practices ahead of AHPRA and accreditation requirements so you can focus on delivering excellent care.",
				imageUrl: "https://i.pravatar.cc/280?img=15",
			},
		],
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
	},
};
