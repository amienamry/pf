import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import FreePalestine from './FreePalestine';
import navbarList from '../mock/navbarList';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useRouter } from 'next/router';
export const Navbar = () => {
	const location = useRouter();
	const [active, setActive] = useState(false);
	const [isTransparent, setTransparent] = useState<boolean>(true);
	const [prevScrollTop, setPrevScrollTop] = useState(0);
	const [backdropHeight, setBackdropHeight] = useState(0);
	const navRef = useRef<HTMLElement>(null);
	const pathname = usePathname();

	useScrollPosition(
		({ currPos }) => {
			const isShow: boolean = currPos.y > -35;
			if (isShow !== isTransparent) setTransparent(isShow);
		},
		[isTransparent]
	);

	useEffect(() => {
		if (active) {
			const height = window.innerHeight - navRef.current.clientHeight;
			setBackdropHeight(height);
		}
	}, [active]);

	const freeze = () => {
		setPrevScrollTop(document.documentElement.scrollTop);
		document.documentElement.style.overflowY = 'hidden';
		document.documentElement.style.position = 'fixed';
	};

	const unfreeze = () => {
		document.documentElement.style.overflowY = 'auto';
		document.documentElement.style.position = 'static';
		document.documentElement.scrollTop = prevScrollTop;
		setPrevScrollTop(0);
	};

	const handleClick = () => {
		if (active) {
			unfreeze();
		} else {
			freeze();
		}

		setActive(!active);
	};

	const close = () => {
		setActive(false);
		unfreeze();
	};

	const handleBackdrop = () => {
		close();
	};

	const isCurrentPath = (path: string) => {
		return path === '/' ? path === pathname : pathname.includes(path);
	};

	return (
		<>
			<Link
				onClick={() => close()}
				className='fixed inline-flex items-center p-5 mr-4 z-20'
				href='/'
			>
				<Image
					src='/images/logo/android-chrome-192x192.png'
					alt='Amien Amry'
					width={50}
					height={50}
				/>
			</Link>

			<FreePalestine />

			<nav
				ref={navRef}
				style={{
					transitionProperty: 'background-color',
					transitionDuration: '0.3s',
				}}
				className={`flex items-center flex-wrap p-3 fixed w-full z-10 bg-black ${
					active ||
					!isTransparent ||
					location.pathname.includes('gallery')
						? 'bg-opaque-custom'
						: 'bg-transparent-custom'
				}`}
			>
				<span className='text-transparent inline-flex items-center p-4 mr-4'>
					.
				</span>
				<button
					className='inline-flex p-3 hover:text-gray-200 rounded lg:hidden text-gray-100 ml-auto outline-none focus:outline-none'
					onClick={handleClick}
				>
					{!active ? (
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M4 6h16M4 12h16M4 18h16'
							/>
						</svg>
					) : (
						<img
							className='w-4 h-4 mr-1'
							src='/images/x-bold.svg'
						/>
					)}
				</button>
				{/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
				<div
					className={`${
						active ? '' : 'hidden'
					} w-full lg:inline-flex lg:flex-grow lg:w-auto`}
				>
					<div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start bg flex flex-col lg:h-auto'>
						{navbarList.map((nav) => {
							return (
								<Link
									key={nav.path + nav.display_name}
									href={nav.path}
									onClick={() => {
										close();
										setTimeout(() => {
											const htmlEl =
												document.getElementsByTagName(
													'html'
												)[0];
											htmlEl.scrollTop = 0;
										});
									}}
									className={`lg:inline-flex lg:w-auto w-full px-3 py-3 rounded text-lg items-center justify-center hover:text-gray-200 ${
										isCurrentPath(nav.path)
											? 'text-white'
											: 'text-gray-400'
									}`}
								>
									{nav.display_name}
								</Link>
							);
						})}
					</div>
				</div>
			</nav>

			<div
				onClick={() => handleBackdrop()}
				style={{
					height: backdropHeight,
					transitionProperty: 'opacity',
					transitionDuration: '0.3s',
					opacity: active ? '1' : '0',
					zIndex: active ? 5 : -10,
				}}
				className='flex justify-center items-end fixed w-full bg-[#191919] inset-shadow bottom-0 left-0'
			></div>
		</>
	);
};
