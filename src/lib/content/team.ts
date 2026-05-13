// team.ts — team member roster. Add a new entry here to add a new card to the /about carousel.
// To add a member: drop their photo in /public/images/team/, then add an entry below.
import type { TeamMember } from "../../types/TeamMember";

export const teamHeading = "Meet the team";
export const teamBody = "Our specialists bring years of combined experience across Australian healthcare settings.";

export const teamMembers: TeamMember[] = [
  {
    name: "Tina Esarapu",
    role: "Practice Manager",
    bio: "Tina is a people-centric Practice Manager with 6+ years of experience in patient-focused healthcare management. Known for her warm, approachable leadership style, she is passionate about building strong, supportive teams and creating positive experiences for both patients and health providers. She brings empathy, clear communication, and a collaborative spirit to every aspect of practice management, ensuring the team and the practice operate at their very best. Tina believes that when teams feel valued and empowered, exceptional patient care naturally follows — and she leads every day with that philosophy at heart. With a genuine love for healthcare and a fun, energetic approach, she creates a workplace culture where both staff and patients feel truly welcomed and cared for.",
    imageUrl: "/images/team/TinaEsarapu.jpeg",
  },
  {
    name: "Bilquis Ali Ahmed",
    role: "Senior Practice Administrator",
    bio: "Bilquis is a highly capable and dependable senior administrator who provides leadership and oversight across the full scope of practice operations. She brings a comprehensive understanding of patient coordination, referral management, compliance, and administrative governance, and is the cornerstone of the practice's administrative function.",
    imageUrl: "/images/team/Bilquis.png",
    imagePosition: "center 60%",
  },
  {
    name: "Hajirah Alviya",
    role: "Practice Administrator",
    bio: "Hajirah brings a warm and professional approach to patient-facing administration, ensuring every patient feels supported from the moment they make contact with the practice. With hands-on experience in specialist practice coordination, she excels in patient liaison, appointment management, and maintaining clear communication between patients and the specialist team.",
    imageUrl: "/images/team/Alvia.jpeg",
  },
  {
    name: "Chakrank Mantri",
    role: "Consulting Technical Architect",
    bio: "Chakrank is the architect behind MedZo's technical infrastructure, specialising in the automation of complex clinical workflows. By integrating secure AI orchestration and privacy-first data pipelines, he ensures our systems meet the highest standards of clinical precision, keeping MedZo at the forefront of the Australian healthcare market.",
    imageUrl: "/images/team/Chakrank.jpeg",
  },
  {
    name: "Shaik Ashma Gulzar",
    role: "Practice Administrator",
    bio: "Ashma is a dedicated practice administrator with a strong foundation in specialist medical administration. Committed to delivering efficient, organised support across scheduling, correspondence, and patient coordination, she brings enthusiasm and a conscientious work ethic to every interaction.",
    imageUrl: "/images/team/Ashma.jpeg",
  },
  {
    name: "Samaira Ahmed",
    role: "Practice Administrator",
    bio: "Samaira brings a well-rounded corporate background to specialist practice management, combining professional discipline with a thorough understanding of operational efficiency. With experience spanning corporate and healthcare administration, she is adept at managing complex workflows, stakeholder communication, and practice compliance.",
    imageUrl: "/images/team/Samaira.jpeg",
  },
  {
    name: "Sobiya Ali",
    role: "Billing Administrator",
    bio: "Sobiya is the practice's dedicated billing and accounts specialist, bringing expert knowledge in medical billing, invoicing, and revenue cycle management. Her meticulous attention to detail and deep understanding of specialist billing processes ensure accuracy, compliance, and timely processing of all accounts.",
  },
];
