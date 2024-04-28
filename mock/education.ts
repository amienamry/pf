import { BiCalendarStar } from "react-icons/bi";
import { FaUserGraduate, FaCertificate } from "react-icons/fa";
import { EducationType } from "../types/Education";

const edus: EducationType[] = [
	{
		year_from: new Date("2016-01-01"),
		year_to: new Date("2018-04-28"),
		title: "Diploma in Database Management System & Web Application",
		company: "Shah Alam Vocational College",
		points: [
			"Acquired comprehensive knowledge in database management systems, including relational database design, querying, and administration, fostering a strong foundation in data management principles.",
			"Developed proficiency in web application development, encompassing front-end and back-end technologies, such as HTML, CSS, JavaScript, PHP, and SQL, equipping with skills to design and deploy dynamic and responsive web solutions.",
			"Collaborated with peers on group projects, developing teamwork and communication skills essential for success in collaborative software development environments.",
		],
		background_color: "#5A9367",
		icon: FaUserGraduate,
		link: "https://www.facebook.com/kvsaofficial",
	},
	{
		year_from: new Date("2014-01-20"),
		year_to: new Date("2015-12-31"),
		title: "SKM in Database Management System & Web Application",
		company: "Shah Alam Vocational College",
		points: [
			"Attained fundamental skills in database management systems, covering basic concepts of database design, implementation, and maintenance, laying the groundwork for understanding database structures.",
			"Learned essential knowledge in web application development, including introductory concepts of front-end and back-end technologies, such as HTML, CSS, JavaScript, PHP, and SQL, enabling the creation of simple website.",
		],
		background_color: "#5A9367",
		icon: FaCertificate,
		link: "https://www.facebook.com/kvsaofficial",
	},
	{
		year_from: new Date("1998-03-24"),
		title: "Born",
		background_color: "rgb(135, 135, 135)",
		icon: BiCalendarStar,
	},
];

export default edus;
