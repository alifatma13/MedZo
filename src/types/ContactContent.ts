// ContactContent.ts — type definitions for all content on the /contact page (hero, form, offices).
export interface Office {
	state: string;
	suburb: string;
	address: string;
	phone: string;
	email: string;
}

export interface ContactFormErrors {
	nameRequired: string;
	nameMin: string;
	emailRequired: string;
	emailInvalid: string;
	phoneRequired: string;
	phoneInvalid: string;
	messageRequired: string;
	messageMin: string;
	suspicious: string;
	submitFailed: string;
}

export interface ContactFormFields {
	name: { label: string; placeholder: string };
	email: { label: string; placeholder: string };
	phone: { label: string; placeholder: string };
	message: { label: string; placeholder: string };
	defaultSubject: string;
	submit: string;
	errors: ContactFormErrors;
	successHeading: string;
	successBody: string;
}

export interface ComingSoonCard {
	badge: string;
	heading: string;
	body: string;
}

export interface ContactContent {
	meta: { title: string; description: string };
	hero: { heading: string; body: string; trust: string[]; trustAriaLabel: string };
	form: { heading: string; body: string; fields: ContactFormFields };
	offices: { heading: string; body: string; locations: Office[]; comingSoon: ComingSoonCard };
}
