import Image from 'next/image';
import { MetaDataType } from '../types/MetaData';
import MainLayout from '../components/MainLayout';
import Experience from './experience';
import ExtraDetails from '../components/ExtraDetails';
import { useEffect, useState } from 'react';
import { HomeData } from '../types/data/HomeData';
import { useSocialMediaApi } from '../hooks/actions/useSocialMediaApi';
import PfIcon from '../components/PfIcon';
import { SocialMediaData } from '../types/data/SocialMediaData';
import PfSkeleton from '../components/PfSkeleton';
import Education from './education';
import { getMetaData } from '../helpers';
import { useQuery } from '@tanstack/react-query';

const fetchHomeData = async () => {
	const res = await fetch('http://localhost:3001/api/home');

	if (!res.ok) {
		throw new Error('Unable to fetch home data');
	}

	return res.json();
};

const App = ({ metaData }: { metaData: MetaDataType }) => {
	return <MainLayout metaData={metaData} Content={() => <Content />} />;
};

const Content = () => {
	const { data, isLoading, error } = useQuery<HomeData>({
		queryKey: ['homeData'],
		queryFn: fetchHomeData,
		staleTime: 1000 * 60 * 10,
	});

	const { data: socialMedias, getData: getSocialMediaData } =
		useSocialMediaApi();

	useEffect(() => {
		getSocialMediaData({
			filter: 'email,github,linkedin,youtube,spotify',
		});
	}, []);

	return (
		<div className='flex flex-col flex-1 max-w-screen-xl mt-20 bg-black bg-opacity-40 rounded-md'>
			<div className='flex flex-1 p-2.5 sm:p-5 flex-col md:flex-row'>
				{/* left */}
				<Profile data={data} socialMedias={socialMedias} />
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

const Profile = ({
	data,
	socialMedias,
}: {
	data?: HomeData;
	socialMedias: SocialMediaData[];
}) => {
	const [bouncingIndex, setBouncingIndex] = useState(0);

	const startBouncing = (): void => {
		const index = Math.floor(Math.random() * socialMedias.length);
		index === bouncingIndex ? startBouncing() : setBouncingIndex(index);
	};

	useEffect(() => {
		let intervalId = null;

		if (!socialMedias.length) return;

		intervalId = setInterval(() => {
			startBouncing();
		}, 2000);

		return () => intervalId && clearInterval(intervalId);
	}, [socialMedias, bouncingIndex]);

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

			{data?.name ? (
				<h1 className='text-4xl font-semi-bold text-gray-100 my-1 pt-5 text-center'>
					{data.name}
				</h1>
			) : (
				<PfSkeleton
					baseColor='rgb(44,44,44)'
					highlightColor='rgb(99,99,99)'
					width='75%'
					containerClassName='flex justify-center'
					className='text-4xl mt-5 py-1'
				/>
			)}
			{data?.role ? (
				<p className='text-xl mt-2 text-center'>{data.role}</p>
			) : (
				<PfSkeleton
					baseColor='rgb(44,44,44)'
					highlightColor='rgb(99,99,99)'
					width='70%'
					containerClassName='flex justify-center'
					className='text-xl mb-2 mt-2.5 py-1'
				/>
			)}
			{data?.city ? (
				<p className='text-xl text-center'>
					{data.age} &#8729; {data?.city}
				</p>
			) : (
				<PfSkeleton
					baseColor='rgb(44,44,44)'
					highlightColor='rgb(99,99,99)'
					width='50%'
					containerClassName='flex justify-center'
					className='text-xl py-1'
				/>
			)}

			{socialMedias.length ? (
				<div className='flex flex-1 items-stretch flex-row mt-8 mb-3'>
					{socialMedias.map((social, i) => {
						return (
							<div
								key={social.url + i}
								className='flex flex-1 justify-center mx-1'
							>
								<a
									href={social.url}
									target={
										social.slug !== 'email'
											? '_blank'
											: undefined
									}
									rel='noopener noreferrer'
									className='h-fit'
								>
									<PfIcon
										name={social.icon}
										className={`${
											bouncingIndex === i ? 'bounce' : ''
										} ${
											social.slug
										} text-5xl md:text-4xl lg:text-4xl xl:text-4xl min-w-full hover:opacity-80`}
									/>
								</a>
							</div>
						);
					})}
				</div>
			) : (
				<PfSkeleton
					baseColor='rgb(44,44,44)'
					highlightColor='rgb(99,99,99)'
					className='text-5xl mt-6'
				/>
			)}
		</div>
	);
};

const Biography = ({ data }: { data?: HomeData }) => {
	return (
		<div className='flex flex-1 flex-col pb-5 px-3 md:px-5'>
			<h3 className='hidden md:block text-4xl mt-8 md:mt-3 xl:mt-3 lg:mt-3 mb-5 font-semi-bold text-gray-100'></h3>
			{data?.summaries?.length ? (
				data.summaries.map((summary, i) => {
					return (
						<p key={`summary${i}`} className='text-xl mb-3'>
							{summary}
						</p>
					);
				})
			) : (
				<PfSkeleton
					baseColor='rgb(44,44,44)'
					highlightColor='rgb(99,99,99)'
					containerClassName='mt-4'
					height={500}
				/>
			)}

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
	return {
		props: {
			metaData: await getMetaData('/home/metadata'),
		},
	};
};

export default App;
