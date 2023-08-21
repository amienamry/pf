import { FiUser } from "react-icons/fi";
import { BiCalendarStar, BiCodeAlt } from "react-icons/bi";
import { ExperienceType } from "../types/Experience";

const exps: ExperienceType[] = [
	{
		year_from: new Date("2022-07-12"),
		year_to: new Date(),
		showYearDiff: true,
		title: "Full Stack Developer",
		company: "SoftwareQ",
		points: [
			"Delivered and maintained multiple projects across diverse industries, including insurance, geomatics, and warehousing.",
			"Designed, implemented, and modified technology solutions for clients, effectively resolving complex business challenges by leveraging industry-standard approaches.",
			"Scaffolded multiple web applications - Angular; applying best practices to optimize project structure for scalability, modularity, and maintainability.",
		],
		background_color: "#5A9367",
		link: "https://softwareq.com",
		icon: BiCodeAlt,
	},
	{
		year_from: new Date("2021-12-13"),
		year_to: new Date("2022-07-02"),
		showYearDiff: true,
		title: "Software Engineer",
		company: "KSK City Labs",
		points: [
			"Designed and developed four essential APIs - Laravel: eDirectory, Event Management, eDocument, and Payment Integration, driving seamless functionality and enhancing overall capabilities.",
			"Liaised with the Product Owner to identify product requirements and clearly defined feature sets.",
		],
		background_color: "#5A9367",
		link: "https://kskcitylabs.com",
		icon: BiCodeAlt,
	},
	{
		year_from: new Date("2019-10-01"),
		year_to: new Date("2021-12-06"),
		showYearDiff: true,
		title: "Full Stack Developer",
		company: "GogoKids",
		points: [
			"Maintained and developed interactive front-end applications: eCommerce web - Angular; eCommerce mobile application - React Native; and Content Management System (CMS) - Angular.",
			"Developed API - Laravel; consumed by multiple clients with thousands of active users.",
			"Implemented Server-side Rendering (SSR) techniques to enhance SEO, resulting in increased website traffic and improved user retention.",
			"Managed software deployment activities, specifically overseeing the setup and configuration of Virtual Private Servers (VPS) for seamless application hosting and delivery.",
		],
		background_color: "#5A9367",
		link: "https://gogokids.my",
		icon: BiCodeAlt,
	},
	{
		year_from: new Date("2018-09-01"),
		year_to: new Date("2019-06-30"),
		showYearDiff: true,
		title: "Admin",
		company: "J&T Express (Outlet)",
		points: [
			"Developed a simple customer CRUD application (JavaScript and PHP) that increased work efficiency by 50%.",
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
