// HomeContent.ts — type for the home page singleton document (maps 1-to-1 to a Sanity homePage document).
import type { HeroContent } from "./HeroContent";
import type { TickerContent } from "./TickerContent";
import type { Metric } from "./Metric";
import type { WhyItem } from "./WhyItem";
import type { SectionHeading } from "./SectionHeading";
import type { FinalCta } from "./FinalCta";

export interface HomeContent {
	hero: HeroContent;
	ticker: TickerContent;
	servicesSection: SectionHeading;
	metrics: Metric[];
	whySection: {
		heading: string;
		imageAlt: string;
		items: WhyItem[];
	};
	testimonialsSection: {
		heading: string;
		viewMore: { label: string; href: string };
	};
	faqSection: {
		heading: string;
	};
	finalCta: FinalCta;
}
