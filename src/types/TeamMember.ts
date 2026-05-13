export interface TeamMember {
	name: string;
	role: string;
	bio: string;
	/** Path under /images/team/ e.g. "/images/team/Jane.jpeg". Omit to show auto-initials. */
	imageUrl?: string;
	/** CSS object-position for the photo crop. Defaults to "center 20%". */
	imagePosition?: string;
}
