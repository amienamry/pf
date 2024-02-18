import { AiFillHtml5 } from "react-icons/ai";
import { DiJavascript1, DiPhp, DiCss3 } from "react-icons/di";
import { GrMysql } from "react-icons/gr";
import { SiCsharp } from "react-icons/si";
import { Extra } from "../types/Extra";

export const languages: Extra[] = [
	{
		name: "JavaScript & TypeScript",
		icon: DiJavascript1,
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
	// {
	// 	name: "C#",
	// 	icon: SiCsharp,
	// },
];
