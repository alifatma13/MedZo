export interface TeamMember {
	initials: string;
	name: string;
	role: string;
	bio: string;
	imageUrl: string;
}

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

export interface ContactContent {
	meta: { title: string; description: string };
	hero: { heading: string; body: string; trust: string[]; trustAriaLabel: string };
	form: { heading: string; body: string; fields: ContactFormFields };
	team: { heading: string; body: string; members: TeamMember[] };
	offices: { heading: string; body: string; locations: Office[] };
}
