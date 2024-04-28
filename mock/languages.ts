import { AiFillHtml5 } from "react-icons/ai";
import { DiPhp, DiCss3 } from "react-icons/di";
import { GrMysql } from "react-icons/gr";
import { Extra } from "../types/Extra";
import { SiTypescript } from "react-icons/si";

export const languages: Extra[] = [
	{
		name: "TypeScript",
		icon: SiTypescript,
	},
	{
		name: "PHP",
		icon: DiPhp,
	},
	{
		name: "MySQL",
		icon: GrMysql,
	},
	{
		name: "HTML",
		icon: AiFillHtml5,
	},
	{
		name: "CSS",
		icon: DiCss3,
	},
];
