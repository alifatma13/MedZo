// ContactContent.ts — developer-owned contact page types only.
// CMS-managed fields (hero heading/body, trust points, offices) live in Sanity.

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
	sendingLabel: string;
	errors: ContactFormErrors;
	successHeading: string;
	successBody: string;
}

export interface ContactContent {
	hero: { trustAriaLabel: string };
	form: { heading: string; body: string; fields: ContactFormFields };
}
