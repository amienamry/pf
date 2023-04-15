import { AiFillGithub } from "react-icons/ai";
import { DiJavascript1, DiJqueryLogo } from "react-icons/di";
import { FaDocker, FaRegMoneyBillAlt } from "react-icons/fa";
import { IoLogoAngular, IoLogoLaravel, IoLogoReact } from "react-icons/io5";
import { RxVercelLogo } from "react-icons/rx";
import {
	SiNextdotjs,
	SiDotnet,
	SiMailchimp,
	SiMapbox,
	SiRedux,
	SiBlazor,
	SiRazer,
	SiTailwindcss,
} from "react-icons/si";
import { TbSquareRoundedNumber8 } from "react-icons/tb";
import { Extra } from "../types/Extra";

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
		name: "Tailwind",
		icon: SiTailwindcss,
	},
	{
		name: "JQuery",
		icon: DiJqueryLogo,
	},
	{
		name: "Redux",
		icon: SiRedux,
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
		name: "Blazor",
		icon: SiBlazor,
	},
	{
		name: ".NET",
		icon: SiDotnet,
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
