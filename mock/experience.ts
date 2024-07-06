import { BiCalendarStar } from "react-icons/bi";
import { ExperienceType } from "../types/Experience";

const exps: ExperienceType[] = [
	{
		year_from: new Date("2022-07-12"),
		year_to: new Date(),
		showYearDiff: true,
		title: "Full Stack Developer",
		company: "SoftwareQ",
		points: [
			"Contributed to diverse software development projects spanning insurance, geomatics, and supply-chain domains.",
			"Designed and implemented tech solutions to solve complex business challenges for clients, using industry-standard methods. Strategically implementing Domain-Driven Design (DDD) architecture.",
			"Provided mentorship to junior developers and interns, offering guidance on technical skills, best practices, and professional development.",
		],
		background_color: "#5A9367",
		link: "https://www.softwareq.com/about-us",
		iconUrl: "https://amienamry.dev/images/exp/swq.png",
	},
	{
		year_from: new Date("2021-12-13"),
		year_to: new Date("2022-07-02"),
		showYearDiff: true,
		title: "Software Engineer",
		company: "KSK Group",
		points: [
			"Designed and developed APIs using Laravel, which includes eDirectory, eDocument, Event Management, and Payment Integration. These APIs played a crucial role in ensuring seamless functionality and extending the overall capabilities of the “8 Conlay” mobile application.",
			"Collaborated closely with the Product Owner to identify product requirements and thoroughly defined feature sets as well as worked closely with the Frontend Mobile App Developer, ensuring smooth integration and efficient workflows in the development process.",
		],
		background_color: "#5A9367",
		link: "https://www.kskgroup.com/company",
		iconUrl: "https://amienamry.dev/images/exp/ksk.png",
	},
	{
		year_from: new Date("2019-10-01"),
		year_to: new Date("2021-12-06"),
		showYearDiff: true,
		title: "Full Stack Developer",
		company: "GogoKids",
		points: [
			"Led the development and maintenance of interactive front-end applications, including an e-commerce web platform using Angular, an e-commerce mobile application leveraging React Native, and two Content Management Systems (CMS) developed with Angular.",
			"Pioneered the development of an API utilizing Laravel, seamlessly catering to multiple clients with an extensive user base reaching thousands. Ensured optimal performance and responsiveness to meet diverse client needs.",
			"Implemented Server-Side Rendering (SSR), significantly enhancing Search Engine Optimization (SEO) for web applications. The result was a notable surge in website traffic and an improvement in user retention.",
			"Managed software deployment activities, focusing on the setup and configuration of Virtual Private Servers (VPS) for streamlined application hosting and delivery.",
		],
		background_color: "#5A9367",
		link: "https://www.gogokids.my/about-us",
		iconUrl: "https://amienamry.dev/images/exp/ggk.png",
	},
	{
		year_from: new Date("2018-09-01"),
		year_to: new Date("2019-06-30"),
		showYearDiff: true,
		title: "Admin",
		company: "J&T Express",
		points: [
			"Engineered a streamlined customer CRUD (Create, Read, Update, Delete) application using JavaScript and PHP, resulting in a remarkable 50% enhancement in work efficiency.",
			"Efficiently managed walk-in customers, administered package handling, oversaw financial transactions, and prepared daily sales reports.",
			"Marketed and secured prospects into a VIP customer that increased the outlet's revenue by 150% within 6 months.",
		],
		background_color: "#5A9367",
		link: "https://www.jtexpress.com/en/aboutUs",
		iconUrl: "https://amienamry.dev/images/exp/jnt.png",
	},
	{
		year_from: new Date("1998-03-24"),
		title: "Born",
		background_color: "rgb(135, 135, 135)",
		icon: BiCalendarStar,
	},
];

export default exps;
