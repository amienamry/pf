import Image from "next/image";
import { FaGithub, FaLinkedinIn, FaSpotify, FaYoutube } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { MetaDataType } from "../types/MetaData";
import MainLayout from "../components/MainLayout";
import { differenceInYears } from "date-fns";
import { useRouter } from "next/router";
import { useCurrentRole } from "../hooks/useCurrentRole";
import Experience from "./experience";
import Education from "./education";
import ExtraDetails from "../components/ExtraDetails";
import { useEffect, useState } from "react";

const exp = differenceInYears(new Date(), new Date("2019-06-16"));

const App = () => {
	const metaData: MetaDataType = {
		title: `Amien Amry | ${useCurrentRole().title}`,
		description: `A full stack developer with ${exp}+ years of experience in web and mobile app dev, I am dedicated to delivering high-quality results. In my free time, I compose and produce music as Arai Junior.`,
		image_url: "https://amienamry.dev/images/amien2.jpg",
		path: "https://amienamry.dev",
	};

	return <MainLayout metaData={metaData} Content={() => <Content />} />;
};

const Content = () => {
	return (
		<div className="flex flex-col flex-1 max-w-screen-xl mt-20 bg-black bg-opacity-40 rounded-md">
			<div className="flex flex-1 p-2.5 sm:p-5 flex-col md:flex-row">
				{/* left */}
				<Profile />
				{/* right */}
				<Biography />
			</div>

			<BasicWrapper marginClassName="mt-2" title="Experience">
				<Experience asChild />
			</BasicWrapper>

			<BasicWrapper marginClassName="mt-12 sm:mt-20" title="Education">
				<Education asChild />
			</BasicWrapper>
		</div>
	);
};

const Profile = () => {
	const router = useRouter();

	const age: number = new Date().getFullYear() - 1998;
	const _socials: {
		component: any;
		url: string;
		isUrl: boolean;
		isBouncing: boolean;
	}[] = [
		{
			component: HiOutlineMail,
			url: "mailto:hi@amienamry.dev",
			isUrl: false,
			isBouncing: false,
		},
		{
			component: FaGithub,
			url: "https://github.com/amienamry",
			isUrl: true,
			isBouncing: false,
		},
		{
			component: FaLinkedinIn,
			url: "https://linkedin.com/in/amienamry",
			isUrl: true,
			isBouncing: false,
		},
		{
			component: FaYoutube,
			url: "https://youtube.com/araijunior",
			isUrl: true,
			isBouncing: false,
		},
		{
			component: FaSpotify,
			url: "https://open.spotify.com/artist/3SwgFLDekh43vfME5GUVPd",
			isUrl: true,
			isBouncing: false,
		},
	];

	const [socials, setSocials] = useState(_socials);

	useEffect(() => {
		let currentIndex = 0;

		const getRandomIndex = (): number => {
			const index = Math.floor(Math.random() * socials.length);

			if (index === currentIndex) {
				return getRandomIndex();
			}

			currentIndex = index;

			return currentIndex;
		};

		const startBouncing = (): void => {
			socials.forEach((social) => (social.isBouncing = false));

			socials[getRandomIndex()].isBouncing = true;

			setSocials([...socials]);
		};

		startBouncing();

		const interval = setInterval(() => {
			startBouncing();
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-initial flex-col p-3 md:p-5 justify-center md:justify-start">
			<div className="flex justify-center">
				<Image
					priority
					className="rounded-full"
					src="/images/amien2.jpg"
					alt="Amien Amry"
					width={250}
					height={250}
				/>
			</div>
			<h1 className="text-4xl font-semi-bold text-gray-100 my-1 pt-5 text-center">
				Amien Amry
			</h1>
			<p className="text-xl mt-2 text-center">{useCurrentRole().title}</p>
			<p className="text-xl text-center">{age} &#8729; Selangor/KL</p>

			<div className="flex flex-1 items-stretch flex-row mt-8 mb-3">
				{socials.map((social, i) => {
					return (
						<div
							key={social.url + i}
							className="flex flex-1 justify-center mx-1"
						>
							<a
								href={social.url}
								target={social.isUrl ? "_blank" : undefined}
								rel="noopener noreferrer"
								className="h-fit"
							>
								<social.component
									className={`${
										social.isBouncing ? "bounce" : ""
									} text-5xl md:text-4xl lg:text-4xl xl:text-4xl min-w-full hover:opacity-80`}
								/>
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const Biography = () => {
	return (
		<div className="flex flex-1 flex-col pb-5 px-3 md:px-5">
			<h3 className="hidden md:block text-4xl mt-8 md:mt-3 xl:mt-3 lg:mt-3 mb-5 font-semi-bold text-gray-100"></h3>
			<p className="text-xl mb-3">
				{useCurrentRole().title} with {exp}+ years of experience in
				designing and developing user interfaces, data structure and
				debugging within mobile app and web technologies. Proven ability
				in optimizing functionalities that improve data retrieval and
				workflow efficiencies.
			</p>
			<p className="text-xl mb-3">
				Familiar with Angular, Laravel, Next JS, React Native, MySQL and
				Object Oriented/Functional Programming. Experienced in various
				third-party APIs and passionate about giving the best design and
				following coding practices.
			</p>

			<ExtraDetails />
		</div>
	);
};

const BasicWrapper = (props) => {
	return (
		<div
			className={`flex flex-col flex-1 p-2.5 sm:p-0 ${props.marginClassName}`}
		>
			<h3 className="text-4xl md:text-center ml-3 sm:ml-8 md:ml-0 mb-6 font-semi-bold text-gray-100">
				{props.title}
			</h3>

			{props.children}
		</div>
	);
};

export default App;
