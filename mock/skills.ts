import { BiTestTube } from "react-icons/bi";
import { TiFlowSwitch } from "react-icons/ti";
import { FaLaptop, FaMobileAlt, FaUsers } from "react-icons/fa";
import { FiDatabase, FiTerminal } from "react-icons/fi";
import { GiLifeInTheBalance, GiSoundWaves } from "react-icons/gi";
import { MdDataObject } from "react-icons/md";
import { TbApi, TbBinaryTree } from "react-icons/tb";
import { Extra } from "../types/Extra";
import { BsInfinity } from "react-icons/bs";

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
		icon: TbApi,
	},
	{
		name: "State Management",
		icon: TiFlowSwitch,
	},
	{
		name: "Linux CLI",
		icon: FiTerminal,
	},
	{
		name: "CI/CD",
		icon: BsInfinity,
	},
	{
		name: "Unit/E2E Testing",
		icon: BiTestTube,
	},
	{
		name: "Domain-Driven Design",
		icon: TbBinaryTree,
	},
	{
		name: "Honesty & Integrity",
		icon: GiLifeInTheBalance,
	},
	{
		name: "Teamwork & Leadership",
		icon: FaUsers,
	},
	{
		name: "Audio Engineering",
		icon: GiSoundWaves,
	},
];
