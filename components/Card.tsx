'use client';
import { formatDistance } from 'date-fns';
import { CardData, CardDataIcon } from '../types/CardData';
import Image from 'next/image';
import { MdVerified } from 'react-icons/md';
import PfLink from './PfLink';

const Card = ({ data, isMobile }: { data: CardData; isMobile?: boolean }) => {
	const formattedDate = formatDistance(data.date, new Date(), {
		addSuffix: true,
	});

	const handleIconClick = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		icon: CardDataIcon
	) => {
		e.preventDefault();
		window.open(icon.url, '_blank');
	};

	return (
		<PfLink
			className='relative shadow-2xl mb-7 sm:mb-5 bg-neutral-700 hover:bg-opacity-70 bg-opacity-50 rounded-xl'
			href={data.href}
			rel='noopener noreferrer'
		>
			<div className='absolute top-2 left-2 sm:hidden z-[1] text-sm bg-black py-0.5 px-1.5 rounded bg-opacity-60'>
				{data.tag}
			</div>

			<div className='flex flex-col sm:flex-row w-full'>
				<div className='relative flex sm:hidden h-56'>
					<Image
						className='absolute object-cover rounded-t-xl'
						fill={true}
						src={data.imgThumb}
						alt={data.imgAltText}
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					/>
				</div>

				<Image
					className='hidden sm:flex rounded-l-xl'
					src={data.imgThumb}
					alt={data.imgAltText}
					width={150}
					height={150}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>

				<div className='flex flex-col w-full px-2 py-1.5 sm:py-0.5'>
					<p className='text-lg font-bold w-fit hover:underline'>
						{data.title}

						<span className='text-sm font-normal ml-2 hidden sm:inline-block bg-black py-0.5 px-1.5 rounded bg-opacity-20 text-gray-400'>
							{data.tag}
						</span>
					</p>
					<p className='text-base opacity-80'>{data.description}</p>

					<div className='flex flex-col h-full justify-end text-xs mt-5'>
						<div className='flex flex-row mb-2'>
							{data.icons?.map((icon) => {
								return (
									<PfLink
										href={icon.url}
										target='_blank'
										rel='noopener noreferrer'
										className='relative flex mr-1.5  hover:opacity-90 bg-slate-100 rounded h-8 sm:h-10 w-8 sm:w-10'
										onClick={(e) =>
											handleIconClick(e, icon)
										}
										key={
											'card-icon-' +
											data.id +
											data.title +
											icon.name
										}
										title={icon.name}
										isMobile={isMobile}
									>
										<Image
											className='rounded-sm sm:rounded'
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
											fill
											alt={`${icon.imgUrl}'s logo`}
											src={icon.imgUrl}
										/>
									</PfLink>
								);
							})}
						</div>
						<span>
							{formattedDate}
							{data.verified && (
								<MdVerified
									title='Verified and officially released.'
									className='ml-1 text-base -mt-0.5 align-text-top inline-flex text-blue-400'
								/>
							)}
						</span>
					</div>
				</div>
			</div>
		</PfLink>
	);
};

export default Card;
