export interface PolicySection {
	heading: string;
	body: string;
}

export interface PolicyBackLink {
	label: string;
	href: string;
}

export interface PolicyContent {
	metaTitle: string;
	metaDescription: string;
	title: string;
	lastUpdated: string;
	intro: string;
	backLink: PolicyBackLink;
	sections: PolicySection[];
}
