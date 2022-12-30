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
			"Designed, modified, and implemented technology solutions for clients using Angular.",
		],
		background_color: "#5A9367",
		link: "https://softwareq.com",
		icon: BiCodeAlt,
	},
	{
		year_from: new Date("2021-12-13"),
		year_to: new Date("2022-07-02"),
		title: "Software Engineer",
		company: "KSK City Labs",
		points: [
			"Developed core modules for API (e-Directory, Event Management, e-Document, and Payment - iPay88); consumed by 8Conlay (residence assistant) mobile app.",
		],
		background_color: "#5A9367",
		link: "https://kskcitylabs.com",
		icon: BiCodeAlt,
	},
	{
		year_from: new Date("2019-10-01"),
		year_to: new Date("2021-12-06"),
		title: "Full Stack Developer",
		company: "GogoKids",
		points: [
			"Developed interactive front-end applications; e-Commerce web (Angular), e-Commerce mobile app (React Native) and CMS (Angular).",
			"Developed API (Laravel); consumed by multiple front-end applications with thousands of active users.",
			"Seamlessly integrated with 3rd party APIs such as Google API, OpenID, payment gateway (Razer Merchant Services and Billplz), Mailchimp and other services.",
			"Wrote scripts (Laravel) to automate any complex workflow that saves 2 hours of manual work daily.",
			"Worked on Server-side Rendering for the benefit of SEO with Angular Universal that increased the website traffic by 10%.",
		],
		background_color: "#5A9367",
		link: "https://gogokids.my",
		icon: BiCodeAlt,
	},
	{
		year_from: new Date("2018-09-01"),
		year_to: new Date("2019-06-30"),
		title: "Admin",
		company: "J&T Express (Outlet)",
		points: [
			"Developed a simple customer CRUD application (JavaScript and PHP) locally that increased work efficiency by 50%.",
			"Served walk-in customers, managed packages, supervised monetary transactions and prepared daily sales reports.",
			"Marketed and secured prospects into a VIP customer that increased the outlet's revenue by 150% in 6 months.",
		],
		background_color: "#5A9367",
		link: "https://www.jtexpress.my/",
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
