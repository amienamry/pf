import Image from 'next/image';
import { FaGithub, FaLinkedin, FaSpotify, FaYoutube } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { MetaDataType } from '../types/MetaData';
import MainLayout from '../components/MainLayout';
import { differenceInYears } from 'date-fns';
import Experience from './experience';
import Education from './education';
import ExtraDetails from '../components/ExtraDetails';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants';
import { useHome } from '../hooks/actions/useHome';
import { HomeData } from '../types/data/HomeData';

const App = ({ metaData }: { metaData: MetaDataType }) => {
	return <MainLayout metaData={metaData} Content={() => <Content />} />;
};

const Content = () => {
	const { data, getData } = useHome();

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className='flex flex-col flex-1 max-w-screen-xl mt-20 bg-black bg-opacity-40 rounded-md'>
			<div className='flex flex-1 p-2.5 sm:p-5 flex-col md:flex-row'>
				{/* left */}
				<Profile data={data} />
				{/* right */}
				<Biography data={data} />
			</div>

			<BasicWrapper marginClassName='mt-2' title='Experience'>
				<Experience asChild />
			</BasicWrapper>

			<BasicWrapper marginClassName='mt-12 sm:mt-20' title='Education'>
				<Education asChild />
			</BasicWrapper>
		</div>
	);
};

const Profile = ({ data }: { data?: HomeData }) => {
	const age: number = new Date().getFullYear() - 1998;
	const _socials: {
		component: any;
		url: string;
		isUrl: boolean;
		isBouncing: boolean;
		textClass: string;
	}[] = [
		{
			component: HiOutlineMail,
			url: 'mailto:hi@amienamry.dev',
			isUrl: false,
			isBouncing: false,
			textClass: 'email',
		},
		{
			component: FaGithub,
			url: 'https://github.com/amienamry',
			isUrl: true,
			isBouncing: false,
			textClass: 'github',
		},
		{
			component: FaLinkedin,
			url: 'https://linkedin.com/in/amienamry',
			isUrl: true,
			isBouncing: false,
			textClass: 'linkedin',
		},
		{
			component: FaYoutube,
			url: 'https://youtube.com/araijunior',
			isUrl: true,
			isBouncing: false,
			textClass: 'youtube',
		},
		{
			component: FaSpotify,
			url: 'https://open.spotify.com/artist/3SwgFLDekh43vfME5GUVPd',
			isUrl: true,
			isBouncing: false,
			textClass: 'spotify',
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
		<div className='flex flex-initial flex-col p-3 md:p-5 justify-center md:justify-start'>
			<div className='flex justify-center'>
				<Image
					priority
					className='rounded-full'
					src='/images/amien2.jpg'
					alt='Amien Amry'
					width={250}
					height={250}
				/>
			</div>
			{data?.name && (
				<h1 className='text-4xl font-semi-bold text-gray-100 my-1 pt-5 text-center'>
					{data.name}
				</h1>
			)}
			{data?.role && (
				<p className='text-xl mt-2 text-center'>{data.role}</p>
			)}
			{data?.city && (
				<p className='text-xl text-center'>
					{age} &#8729; {data?.city}
				</p>
			)}

			<div className='flex flex-1 items-stretch flex-row mt-8 mb-3'>
				{socials.map((social, i) => {
					return (
						<div
							key={social.url + i}
							className='flex flex-1 justify-center mx-1'
						>
							<a
								href={social.url}
								target={social.isUrl ? '_blank' : undefined}
								rel='noopener noreferrer'
								className='h-fit'
							>
								<social.component
									className={`${
										social.isBouncing ? 'bounce' : ''
									} ${
										social.textClass
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

const Biography = ({ data }: { data?: HomeData }) => {
	return (
		<div className='flex flex-1 flex-col pb-5 px-3 md:px-5'>
			<h3 className='hidden md:block text-4xl mt-8 md:mt-3 xl:mt-3 lg:mt-3 mb-5 font-semi-bold text-gray-100'></h3>
			{!!data?.summaries?.length &&
				data.summaries.map((summary, i) => {
					return (
						<p key={`summary${i}`} className='text-xl mb-3'>
							{summary}
						</p>
					);
				})}

			<ExtraDetails data={data} />
		</div>
	);
};

const BasicWrapper = (props) => {
	return (
		<div
			className={`flex flex-col flex-1 p-2.5 sm:p-0 ${props.marginClassName}`}
		>
			<h3 className='text-4xl md:text-center ml-3 sm:ml-8 md:ml-0 mb-6 font-semi-bold text-gray-100'>
				{props.title}
			</h3>

			{props.children}
		</div>
	);
};

export const getServerSideProps = async () => {
	const res = await fetch(`${API_URL}/home/metadata`, {
		cache: 'force-cache',
	});

	return {
		props: {
			metaData: await res.json(),
		},
	};
};

export default App;
