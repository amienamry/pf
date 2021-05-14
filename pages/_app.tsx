import { useState } from 'react';
import '../styles/main.css';
import { AppProps } from 'next/app';
import { Navbar } from '../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [hasVideoError, setHasVideoError] = useState<boolean>(false);

	const videoError = () => {
		setHasVideoError(true);
	};

	return (
		<div
			className={`${
				hasVideoError ? 'bg-gray-900 ' : ''
			} relative text-gray-200 font-sans font-normal min-h-screen`}>
			{pageProps?.statusCode === 404 && (
				<>
					<div className='flex flex 1 absolute w-full h-full justify-center content-center'>
						<Image
							className=''
							src='/images/404.jpg'
							alt='not_found'
							width={1280}
							height={853}
							objectFit='contain'
						/>
					</div>

					<Link href='/'>
						<a className='md:hidden lg:hidden xl:hidden 2xl:hidden 3xl:hidden'>
							<button
								style={{ width: '-webkit-fill-available' }}
								className='absolute rounded-full bottom-0 m-3 p-3 text-white bg-green-400 text-xl font-semibold'>
								Go To Homepage
							</button>
						</a>
					</Link>
				</>
			)}

			{pageProps?.statusCode !== 404 && (
				<video
					onError={videoError}
					autoPlay
					muted
					loop
					id='myVideo'
					style={{
						objectFit: 'cover',
						width: '100vw',
						height: '100vh',
						position: 'fixed',
						top: 0,
						left: 0,
						zIndex: -1,
					}}>
					<source src='/videos/bg-video.mp4' type='video/mp4' />
				</video>
			)}

			{pageProps?.statusCode !== 404 && <Navbar />}

			<Component {...pageProps} />

			{pageProps?.statusCode !== 404 && !hasVideoError && <CreditFooter />}
		</div>
	);
};

const CreditFooter = () => {
	return (
		<div className='absolute bottom-2 right-2 text-sm'>
			Video by{' '}
			<a
				rel='noopener noreferrer'
				href='https://pixabay.com/users/enchantedstudios-722609/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=13495'>
				Simon Brough
			</a>{' '}
			from{' '}
			<a
				rel='noopener noreferrer'
				href='https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=13495'>
				Pixabay
			</a>
		</div>
	);
};
export default MyApp;
