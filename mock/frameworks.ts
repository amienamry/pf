import { DiJqueryLogo } from "react-icons/di";
import { IoLogoAngular, IoLogoLaravel, IoLogoReact } from "react-icons/io5";
import { SiNextdotjs, SiDotnet } from "react-icons/si";
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
		name: "JQuery",
		icon: DiJqueryLogo,
	},
	{
		name: ".NET",
		icon: SiDotnet,
	},
];
