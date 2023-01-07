import { BiCalendarStar } from "react-icons/bi";
import { FaUserGraduate, FaCertificate } from "react-icons/fa";
import { EducationType } from "../types/Education";

const edus: EducationType[] = [
	{
		year_from: new Date("2016-01-01"),
		year_to: new Date("2018-04-28"),
		title: "Diploma in Database Management System & Web Application",
		company: "Shah Alam Vocational College",
		points: [],
		background_color: "#5A9367",
		icon: FaUserGraduate,
	},
	{
		year_from: new Date("2014-01-20"),
		year_to: new Date("2015-12-31"),
		title: "SKM in Database Management System & Web Application",
		company: "Shah Alam Vocational College",
		points: [],
		background_color: "#5A9367",
		icon: FaCertificate,
	},
	{
		year_from: new Date("1998-03-24"),
		title: "Born",
		background_color: "rgb(135, 135, 135)",
		icon: BiCalendarStar,
	},
];

export default edus;
