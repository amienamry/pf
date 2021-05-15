import { useState, useEffect } from 'react';
import '../styles/main.css';
import '../styles/custom.css';
import { AppProps } from 'next/app';
import { Navbar } from '../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useRouter } from 'next/router';
import * as gtag from '../lib/gtag';

const MyApp = ({ Component, pageProps }: AppProps) => {
	const [hasVideoError, setHasVideoError] = useState<boolean>(false);
	const [isTransparent, setTransparent] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		const handleRouteChange = (url) => {
			gtag.pageview(url);
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	const videoError = () => {
		setHasVideoError(true);
	};

	useScrollPosition(
		({ currPos }) => {
			const isShow: boolean = currPos.y > -35;
			if (isShow !== isTransparent) setTransparent(isShow);
		},
		[isTransparent]
	);

	return (
		<div
			className={`${
				hasVideoError ? 'bg-gray-900 ' : ''
			} relative text-gray-200 font-sans font-normal min-h-screen `}>
			{pageProps?.statusCode === 404 && <Error404 />}

			{pageProps?.statusCode !== 404 && <BackgroundVideo videoError={videoError} />}

			{pageProps?.statusCode !== 404 && <Navbar isTransparent={isTransparent} />}

			<Component {...pageProps} />

			{pageProps?.statusCode !== 404 && !hasVideoError && <CreditFooter />}
		</div>
	);
};

const Error404 = () => {
	return (
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
	);
};

const BackgroundVideo = (props: { videoError: () => void }) => {
	return (
		<video
			onError={props.videoError}
			autoPlay
			muted
			loop
			id='myVideo'
			style={{
				objectFit: 'cover',
				width: '100%',
				height: '100%',
				position: 'fixed',
				top: 0,
				left: 0,
				zIndex: -1,
			}}>
			<source src='/videos/bg-video.mp4' type='video/mp4' />
		</video>
	);
};

const CreditFooter = () => {
	return (
		<div className='absolute bottom-2 right-2 text-xs'>
			Video by{' '}
			<a
				className='font-semibold'
				rel='noopener noreferrer'
				href='https://pixabay.com/users/enchantedstudios-722609/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=13495'>
				Simon Brough
			</a>{' '}
			from{' '}
			<a
				className='font-semibold'
				rel='noopener noreferrer'
				href='https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=13495'>
				Pixabay
			</a>
		</div>
	);
};
export default MyApp;
