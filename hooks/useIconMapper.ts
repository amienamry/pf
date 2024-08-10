import { BiTestTube } from 'react-icons/bi';
import { TiFlowSwitch } from 'react-icons/ti';
import { FaLaptop, FaMobileAlt, FaUsers } from 'react-icons/fa';
import { FiDatabase, FiTerminal } from 'react-icons/fi';
import { GiLifeInTheBalance, GiPianoKeys } from 'react-icons/gi';
import { MdDataObject, MdMusicNote } from 'react-icons/md';
import { TbApi, TbBinaryTree, TbError404 } from 'react-icons/tb';
import { BsInfinity, BsSearch } from 'react-icons/bs';
import { SiGoogle } from 'react-icons/si';
import { AiFillHtml5 } from 'react-icons/ai';
import { DiPhp, DiCss3 } from 'react-icons/di';
import { GrMysql } from 'react-icons/gr';
import { SiTypescript } from 'react-icons/si';
import { AiFillGithub } from 'react-icons/ai';
import { DiGit, DiJavascript1, DiJqueryLogo } from 'react-icons/di';
import { FaDocker, FaRegMoneyBillAlt } from 'react-icons/fa';
import { IoLogoAngular, IoLogoLaravel, IoLogoReact } from 'react-icons/io5';
import { RxVercelLogo } from 'react-icons/rx';
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
} from 'react-icons/si';
import { TbSquareRoundedNumber8 } from 'react-icons/tb';
import { RiSignalTowerLine } from 'react-icons/ri';
import { BsFiletypePhp } from 'react-icons/bs';
import { AiOutlineRobot, AiOutlineCloud } from 'react-icons/ai';
import { MdLockOutline } from 'react-icons/md';
import { FaLaptopCode } from 'react-icons/fa';
import { GiCampingTent } from 'react-icons/gi';
import { BsMusicNote } from 'react-icons/bs';

export const useIconMapper = (name: string) => {
	const cmp = {
		FaLaptop: FaLaptop,
		FaMobileAlt: FaMobileAlt,
		FiDatabase: FiDatabase,
		MdDataObject: MdDataObject,
		TbApi: TbApi,
		SiGoogle: SiGoogle,
		TiFlowSwitch: TiFlowSwitch,
		FiTerminal: FiTerminal,
		BsInfinity: BsInfinity,
		BiTestTube: BiTestTube,
		TbBinaryTree: TbBinaryTree,
		BsSearch: BsSearch,
		GiLifeInTheBalance: GiLifeInTheBalance,
		FaUsers: FaUsers,
		GiPianoKeys: GiPianoKeys,
		MdMusicNote: MdMusicNote,
		AiFillHtml5: AiFillHtml5,
		DiPhp: DiPhp,
		DiCss3: DiCss3,
		GrMysql: GrMysql,
		SiTypescript: SiTypescript,
		IoLogoAngular: IoLogoAngular,
		IoLogoLaravel: IoLogoLaravel,
		SiNextdotjs: SiNextdotjs,
		IoLogoReact: IoLogoReact,
		RiSignalTowerLine: RiSignalTowerLine,
		SiJest: SiJest,
		SiCypress: SiCypress,
		BsFiletypePhp: BsFiletypePhp,
		DiGit: DiGit,
		SiTailwindcss: SiTailwindcss,
		SiNgrx: SiNgrx,
		SiXstate: SiXstate,
		SiRedux: SiRedux,
		SiJira: SiJira,
		SiVerdaccio: SiVerdaccio,
		SiGerrit: SiGerrit,
		DiJqueryLogo: DiJqueryLogo,
		SiMailchimp: SiMailchimp,
		SiMapbox: SiMapbox,
		FaDocker: FaDocker,
		DiJavascript1: DiJavascript1,
		RxVercelLogo: RxVercelLogo,
		AiFillGithub: AiFillGithub,
		SiRazer: SiRazer,
		FaRegMoneyBillAlt: FaRegMoneyBillAlt,
		TbSquareRoundedNumber8: TbSquareRoundedNumber8,
		AiOutlineRobot: AiOutlineRobot,
		MdLockOutline: MdLockOutline,
		AiOutlineCloud: AiOutlineCloud,
		FaLaptopCode: FaLaptopCode,
		BsMusicNote: BsMusicNote,
		GiCampingTent: GiCampingTent,
	}[name];

	if (!cmp) return TbError404;

	return cmp;
};
