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
	/** Accessible label for the sidebar <nav> element. */
	sidebarAriaLabel: string;
	backLink: PolicyBackLink;
	sections: PolicySection[];
	faqs?: PolicyFAQ[];
	/** Heading shown above the FAQ accordion block (only rendered when faqs is non-empty). */
	faqsHeading?: string;
	/** Sidebar link label for the FAQs anchor (only rendered when faqs is non-empty). */
	faqsLinkLabel?: string;
}
