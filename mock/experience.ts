import { FiUser } from "react-icons/fi";
import { BiCalendarStar, BiCodeAlt } from "react-icons/bi";
import { ExperienceType } from "../types/Experience";

const exps: ExperienceType[] = [
	{
		year_from: new Date("2022-07-12"),
		year_to: new Date(),
		title: "Full Stack Developer",
		company: "SoftwareQ",
		points: [
			"Technically responsible for the whole SDLC of the insurance management application's development (front-end).",
		],
		background_color: "#5A9367",
		icon: BiCodeAlt,
	},
	{
		year_from: new Date("2021-12-13"),
		year_to: new Date("2022-07-02"),
		title: "Software Engineer",
		company: "KSK City Labs",
		points: [
			"Developed CMS and APIs to be consumed by 8Conlay (residence assistant) mobile app.",
			"Developed 4 core modules (e-Directory, Event Management, e-Document, and Payment integrated with iPay88).",
		],
		background_color: "#5A9367",
		icon: BiCodeAlt,
	},
	{
		year_from: new Date("2019-10-01"),
		year_to: new Date("2021-12-06"),
		title: "Full Stack Developer",
		company: "GogoKids Technologies",
		points: [
			"Developed full-stack web and mobile applications.",
			"Developed API that has been consumed by 4 front-end applications, as well as integrated with external APIs such as Google API, OpenID, payment gateway (Razer Merchant Services and Billplz), and other services.",
			"Managed time-sensitive updates, including content changes and database updates.",
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
			"Developed a simple CRUD application locally that can save and search customer's details.",
			"Served walk-in customers who send or self collect documents/packages, complaints and enquiries.",
			"Managed airway bills items, supervised monetary transactions and prepared daily sales reports.",
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
