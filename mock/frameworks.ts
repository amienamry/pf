import { AiFillGithub } from "react-icons/ai";
import { DiGit, DiJavascript1, DiJqueryLogo } from "react-icons/di";
import { FaDocker, FaRegMoneyBillAlt } from "react-icons/fa";
import { IoLogoAngular, IoLogoLaravel, IoLogoReact } from "react-icons/io5";
import { RxVercelLogo } from "react-icons/rx";
import {
	SiNextdotjs,
	SiMailchimp,
	SiMapbox,
	SiRedux,
	SiRazer,
	SiTailwindcss,
	SiXstate,
	SiNgrx,
	SiVerdaccio,
	SiGerrit,
	SiJira,
	SiCypress,
	SiJest,
} from "react-icons/si";
import { TbSquareRoundedNumber8 } from "react-icons/tb";
import { Extra } from "../types/Extra";
import { RiSignalTowerLine } from "react-icons/ri";
import { BsFiletypePhp } from "react-icons/bs";

export const frameworks: Extra[] = [
	{
		name: "Angular",
		icon: IoLogoAngular,
	},
	{
		name: "Laravel",
		icon: IoLogoLaravel,
	},
	{
		name: "Next JS",
		icon: SiNextdotjs,
	},
	{
		name: "React Native",
		icon: IoLogoReact,
	},
	{
		name: "Signal",
		icon: RiSignalTowerLine,
	},
	{
		name: "Jest",
		icon: SiJest,
	},
	{
		name: "Cypress",
		icon: SiCypress,
	},
	{
		name: "PHPUnit",
		icon: BsFiletypePhp,
	},
	{
		name: "Git",
		icon: DiGit,
	},
	{
		name: "Tailwind",
		icon: SiTailwindcss,
	},
	{
		name: "NGRX",
		icon: SiNgrx,
	},
	{
		name: "NGXS",
		icon: SiXstate,
	},
	{
		name: "Redux",
		icon: SiRedux,
	},
	{
		name: "Jira",
		icon: SiJira,
	},
	{
		name: "Verdaccio",
		icon: SiVerdaccio,
	},
	{
		name: "Gerrit",
		icon: SiGerrit,
	},
	{
		name: "JQuery",
		icon: DiJqueryLogo,
	},
	{
		name: "Mailchimp",
		icon: SiMailchimp,
	},
	{
		name: "Mapbox",
		icon: SiMapbox,
	},
	{
		name: "Docker",
		icon: FaDocker,
	},
	{
		name: "Turf JS",
		icon: DiJavascript1,
	},
	{
		name: "Vercel",
		icon: RxVercelLogo,
	},
	{
		name: "Github",
		icon: AiFillGithub,
	},
	{
		name: "Razer Merchant Services",
		icon: SiRazer,
	},
	{
		name: "Billplz",
		icon: FaRegMoneyBillAlt,
	},
	{
		name: "iPay88",
		icon: TbSquareRoundedNumber8,
	},
];
