// PolicyContent.ts — shared type for legal pages (Privacy Policy and Terms of Service): meta, sections, back-link, and optional FAQs.
export interface PolicySection {
	heading: string;
	body: string;
}

export interface PolicyBackLink {
	label: string;
	href: string;
}

export interface PolicyFAQ {
	question: string;
	answer: string;
}

export interface PolicyContent {
	metaTitle: string;
	metaDescription: string;
	title: string;
	lastUpdated: string;
	intro: string;
	backLink: PolicyBackLink;
	sections: PolicySection[];
	faqs?: PolicyFAQ[];
}
