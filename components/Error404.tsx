import Image from 'next/image';
import Link from 'next/link';

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

export default Error404;
