import { AiOutlineApi } from "react-icons/ai";
import { BiTestTube } from "react-icons/bi";
import { DiTerminal } from "react-icons/di";
import {
	FaArrowsAltH,
	FaLaptop,
	FaMobileAlt,
	FaStream,
	FaUsers,
	FaWaveSquare,
} from "react-icons/fa";
import { FiDatabase } from "react-icons/fi";
import { MdDataObject } from "react-icons/md";
import { VscDebugContinue } from "react-icons/vsc";
import { Extra } from "../types/Extra";

export const skills: Extra[] = [
	{
		name: "Web Development",
		icon: FaLaptop,
	},
	{
		name: "Mobile Development",
		icon: FaMobileAlt,
	},
	{
		name: "Database Management",
		icon: FiDatabase,
	},
	{
		name: "Object-Oriented Programming",
		icon: MdDataObject,
	},
	{
		name: "RESTful API",
		icon: AiOutlineApi,
	},
	{
		name: "State Management",
		icon: FaStream,
	},
	{
		name: "Shell Scripting",
		icon: DiTerminal,
	},
	{
		name: "CI/CD",
		icon: VscDebugContinue,
	},
	{
		name: "Unit & E2E Testing",
		icon: BiTestTube,
	},
	{
		name: "Domain-Driven Design",
		icon: FaArrowsAltH,
	},
	{
		name: "Teamwork & Leadership",
		icon: FaUsers,
	},
	{
		name: "Audio Engineering",
		icon: FaWaveSquare,
	},
];
