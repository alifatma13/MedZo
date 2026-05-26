// HomeContent.ts — type for the home page singleton document (maps 1-to-1 to a Sanity homePage document).
import type { HeroContent } from "./HeroContent";
import type { TickerContent } from "./TickerContent";
import type { Metric } from "./Metric";
import type { WhyItem } from "./WhyItem";
import type { SectionHeading } from "./SectionHeading";
import type { FinalCta } from "./FinalCta";
import type { HowItWorksContent } from "./HowItWorksContent";

export interface HomeContent {
	hero: HeroContent;
	ticker: TickerContent;
	howItWorks: HowItWorksContent;
	servicesSection: SectionHeading;
	/** Bridge link below the services strip pointing to the How It Works section. */
	servicesBridge?: { text: string; href: string; ariaLabel: string };
	whySection: {
		heading: string;
		imageAlt: string;
		metrics: Metric[];
		items: WhyItem[];
	};
	testimonialsSection: {
		heading: string;
		viewMore: { label: string; href: string };
	};
	faqSection: {
		heading: string;
		metaTitle: string;
		metaDescription: string;
	};
	finalCta: FinalCta;
}
