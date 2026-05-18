export interface HowItWorksStep {
	stepLabel: string;
	title: string;
	description: string;
	bullets: string[];
}

export interface HowItWorksContent {
	eyebrow: string;
	heading: string;
	subheading: string;
	steps: HowItWorksStep[];
}
