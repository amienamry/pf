import { IconType } from "react-icons";

export type ExperienceType = {
	year_from: Date;
	year_to?: Date;
	showYearDiff?: boolean;
	title: string;
	company?: string;
	points?: string[];
	background_color: string;
	background_color2?: string;
	link?: string;
	icon: IconType;
};
