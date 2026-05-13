// AboutContent.ts — type definitions for all content on the /about page.
import type { TeamMember } from "./TeamMember";
export type { TeamMember };

export interface AboutFounder {
	sectionHeading: string;
	intro: string;
	name: string;
	role: string;
	bio: string[];
	imageUrl?: string;
}

export interface AboutValue {
	title: string;
	body: string;
	icon?: string;
}

export interface AboutContent {
	metaTitle: string;
	metaDescription: string;
	hero: {
		title: string;
		heading: string;
		paragraphs: string[];
	};
	founder: AboutFounder;
	mission: {
		heading: string;
		body: string;
	};
	values: {
		heading: string;
		items: AboutValue[];
	};
	credentials: {
		heading: string;
		items: string[];
	};
	team: {
		heading: string;
		body: string;
		members: TeamMember[];
	};
	cta: {
		body: string;
		buttonLabel: string;
		buttonHref: string;
	};
}
