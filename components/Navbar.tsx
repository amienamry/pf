import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

import FreePalestine from './FreePalestine';

export const Navbar = (props: { isTransparent: boolean }) => {
	const [active, setActive] = useState(false);

	const handleClick = () => {
		setActive(!active);
	};

	return (
		<>
			<Link href='/'>
				<a className='fixed inline-flex items-center p-5 mr-4 z-20'>
					<Image src='/images/logo/android-chrome-192x192.png' alt='Amien Amry' width={50} height={50} />
				</a>
			</Link>

			<FreePalestine />

			<nav
				style={{
					transitionProperty: 'background-color',
					transitionDuration: '1s',
				}}
				className={`flex items-center flex-wrap p-3 fixed w-full z-10 bg-black ${
					active || !props.isTransparent ? 'bg-opaque-custom' : 'bg-transparent-custom'
				}`}>
				<span className='text-transparent inline-flex items-center p-4 mr-4'>.</span>
				<button
					className='inline-flex p-3 hover:text-gray-200 rounded lg:hidden text-gray-100 ml-auto outline-none focus:outline-none'
					onClick={handleClick}>
					<svg
						className='w-6 h-6'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M4 6h16M4 12h16M4 18h16'
						/>
					</svg>
				</button>
				{/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}
				<div className={`${active ? '' : 'hidden'} w-full lg:inline-flex lg:flex-grow lg:w-auto`}>
					<div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start bg flex flex-col lg:h-auto pt-3'>
						<Link href='/'>
							<a
								onClick={handleClick}
								className='lg:inline-flex lg:w-auto w-full px-3 py-3 rounded text-gray-100 text-xl items-center justify-center hover:text-gray-200'>
								Home
							</a>
						</Link>
						<Link href='/experience'>
							<a
								onClick={handleClick}
								className='lg:inline-flex lg:w-auto w-full px-3 py-3 rounded text-gray-100 text-xl items-center justify-center hover:text-gray-200'>
								Experience
							</a>
						</Link>
					</div>
				</div>
			</nav>
		</>
	);
};
