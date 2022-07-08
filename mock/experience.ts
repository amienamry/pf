import { FiUser } from "react-icons/fi";
import { BiCalendarStar, BiCodeAlt } from "react-icons/bi";
import { ExperienceType } from "../types/Experience";

const exps: ExperienceType[] = [
	{
		year_from: new Date("2021-12-13"),
		year_to: new Date("2022-07-02"),
		title: "Software Engineer",
		company: "KSK City Labs",
		points: ["Developed web CMS and APIs."],
		background_color: "#5A9367",
		icon: BiCodeAlt,
	},
	{
		year_from: new Date("2019-10-01"),
		year_to: new Date("2021-12-06"),
		title: "Full-Stack Developer",
		company: "GogoKids Technologies",
		points: [
			"Developed full-stack web and mobile applications which processed, analyzed, and rendered data visually.",
			"Developed APIs and integrate with other APIs such as Google Maps, social media logins, payment gateway, and other services.",
			"Managed time-sensitive updates, including content changes and database upgrades.",
			"Planned, wrote, and debugged web and mobile applications with complete accuracy.",
		],
		background_color: "#5A9367",
		icon: BiCodeAlt,
	},
	{
		year_from: new Date("2018-09-01"),
		year_to: new Date("2019-06-30"),
		title: "Admin",
		company: "J&T Express",
		points: [
			"Served walk-in customers who send or self collect documents and packages, complaints and enquiries.",
			"Prepared daily DropPoint (DP) operation & sales reports.",
			"Managed salvage and airway bills items in the DP.",
			"Managed monetary transactions with integrity.",
		],
		background_color: "#5A9367",
		icon: FiUser,
	},
	{
		year_from: new Date("1998-03-24"),
		title: "Born",
		background_color: "rgb(135, 135, 135)",
		icon: BiCalendarStar,
	},
];

export default exps;
