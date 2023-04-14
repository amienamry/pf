import { useState } from "react";
import {
	AiOutlineApi,
	AiFillHtml5,
	AiOutlineRobot,
	AiOutlineCloud,
} from "react-icons/ai";
import { BiTestTube } from "react-icons/bi";
import {
	DiTerminal,
	DiJavascript1,
	DiPhp,
	DiCss3,
	DiGit,
	DiJqueryLogo,
} from "react-icons/di";
import {
	FaLaptop,
	FaMobileAlt,
	FaCode,
	FaStream,
	FaArrowsAltH,
	FaUsers,
	FaWaveSquare,
	FaArrowRight,
} from "react-icons/fa";
import { FiDatabase } from "react-icons/fi";
import { GrMysql } from "react-icons/gr";
import { IoLogoAngular, IoLogoLaravel, IoLogoReact } from "react-icons/io5";
import { MdLockOutline } from "react-icons/md";
import { SiCsharp, SiNextdotjs, SiDotnet } from "react-icons/si";
import { VscDebugContinue } from "react-icons/vsc";

const ExtraDetails = () => {
	const [showSkills, setShowSkills] = useState(false);
	const [showLangs, setShowLangs] = useState(false);
	const [showFrameworks, setShowFrameworks] = useState(false);

	return (
		<>
			<div className="flex flex-1 flex-col flex-wrap md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
				<div className="flex flex-1 flex-col mt-6">
					<h3 className="text-4xl mt-3 mb-5 font-semi-bold text-gray-100">
						Skills
					</h3>
					<div>
						<ul>
							<li className="flex items-center text-xl mb-1">
								<FaLaptop className="mr-3 text-2xl" /> Web
								Development
							</li>
							<li className="flex items-center text-xl mb-1">
								<FaMobileAlt className="mr-3 text-2xl" /> Mobile
								App Development
							</li>
							<li className="flex items-center text-xl mb-1">
								<FiDatabase className="mr-3 text-2xl" />{" "}
								Database Management
							</li>
							{!!showSkills && (
								<>
									<li className="flex items-center text-xl mb-1">
										<FaCode className="mr-3 text-2xl" />{" "}
										Object-Oriented Programming
									</li>
									<li className="flex items-center text-xl mb-1">
										<AiOutlineApi className="mr-3 text-2xl" />{" "}
										RESTful API
									</li>
									<li className="flex items-center text-xl mb-1">
										<FaStream className="mr-3 text-2xl" />{" "}
										State Management
									</li>
									<li className="flex items-center text-xl mb-1">
										<DiTerminal className="mr-3 text-2xl" />{" "}
										Shell Scripting
									</li>
									<li className="flex items-center text-xl mb-1">
										<VscDebugContinue className="mr-3 text-2xl" />{" "}
										CI/CD
									</li>
									<li className="flex items-center text-xl mb-1">
										<BiTestTube className="mr-3 text-2xl" />{" "}
										Unit & E2E Testing
									</li>
									<li className="flex items-center text-xl mb-1">
										<FaArrowsAltH className="mr-3 text-2xl" />{" "}
										Domain-Driven Design
									</li>
									<li className="flex items-center text-xl mb-1">
										<FaUsers className="mr-3 text-2xl" />{" "}
										Teamwork & Leadership
									</li>
									<li className="flex items-center text-xl mb-1">
										<FaWaveSquare className="mr-3 text-2xl" />{" "}
										Audio Engineering
									</li>
								</>
							)}
						</ul>
						{!showSkills && (
							<div className="mt-3">
								<span
									onClick={() => setShowSkills(true)}
									className="hover:bg-slate-800 px-1.5 rounded font-semibold flex flex-row items-center cursor-pointer w-fit"
								>
									Show all skills{" "}
									<FaArrowRight className="ml-2" />
								</span>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-1 flex-col mt-6">
					<h3 className="text-4xl mt-3 mb-5 font-semi-bold text-gray-100">
						Languages
					</h3>
					<div>
						<ul>
							<li className="flex items-center text-xl mb-1">
								<DiJavascript1 className="mr-3 text-2xl" />{" "}
								JavaScript & TypeScript
							</li>
							<li className="flex items-center text-xl mb-1">
								<DiPhp className="mr-3 text-2xl" /> PHP
							</li>
							<li className="flex items-center text-xl mb-1">
								<GrMysql className="mr-3 text-2xl" /> MySQL
							</li>
							{!!showLangs && (
								<>
									<li className="flex items-center text-xl mb-1">
										<AiFillHtml5 className="mr-3 text-2xl" />{" "}
										HTML
									</li>
									<li className="flex items-center text-xl mb-1">
										<DiCss3 className="mr-3 text-2xl" /> CSS
									</li>
									<li className="flex items-center text-xl mb-1">
										<DiGit className="mr-3 text-2xl" /> Git
									</li>
									<li className="flex items-center text-xl mb-1">
										<SiCsharp className="mr-3 text-2xl" />{" "}
										C#
									</li>
								</>
							)}
						</ul>
						{!showLangs && (
							<div className="mt-3">
								<span
									onClick={() => setShowLangs(true)}
									className="hover:bg-slate-800 px-1.5 rounded font-semibold flex flex-row items-center cursor-pointer w-fit"
								>
									Show all languages{" "}
									<FaArrowRight className="ml-2" />
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="flex flex-1 flex-col flex-wrap md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
				<div className="flex flex-1 flex-col mt-6">
					<h3 className="text-4xl mt-3 mb-5 font-semi-bold text-gray-100">
						Frameworks
					</h3>
					<div>
						<ul>
							<li className="flex items-center text-xl mb-1">
								<IoLogoAngular className="mr-3 text-2xl" />{" "}
								Angular
							</li>
							<li className="flex items-center text-xl mb-1">
								<IoLogoLaravel className="mr-3 text-2xl" />{" "}
								Laravel
							</li>
							<li className="flex items-center text-xl mb-1">
								<SiNextdotjs className="mr-3 text-2xl" /> Next
								JS
							</li>
							{!!showFrameworks && (
								<>
									<li className="flex items-center text-xl mb-1">
										<IoLogoReact className="mr-3 text-2xl" />{" "}
										React Native
									</li>
									<li className="flex items-center text-xl mb-1">
										<DiJqueryLogo className="mr-3 text-2xl" />{" "}
										JQuery
									</li>
									<li className="flex items-center text-xl mb-1">
										<SiDotnet className="mr-3 text-2xl" />{" "}
										.NET
									</li>
								</>
							)}
						</ul>
						{!showFrameworks && (
							<div className="mt-3">
								<span
									onClick={() => setShowFrameworks(true)}
									className="hover:bg-slate-800 px-1.5 rounded font-semibold flex flex-row items-center cursor-pointer w-fit"
								>
									Show all frameworks{" "}
									<FaArrowRight className="ml-2" />
								</span>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-1 flex-col mt-6">
					<h3 className="text-4xl mt-3 mb-5 font-semi-bold text-gray-100">
						Keen to Explore
					</h3>
					<div>
						<ul>
							<li className="flex items-center text-xl mb-1">
								<AiOutlineRobot className="mr-3 text-2xl" /> AI
								& Machine Learning
							</li>
							<li className="flex items-center text-xl mb-1">
								<MdLockOutline className="mr-3 text-2xl" />{" "}
								Cybersecurity
							</li>
							<li className="flex items-center text-xl mb-1">
								<AiOutlineCloud className="mr-3 text-2xl" />{" "}
								Cloud Computing
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
};

export default ExtraDetails;
