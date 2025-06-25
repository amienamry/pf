import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { IoLocationSharp } from 'react-icons/io5';
import { images } from '../mock/images';
import { PfImage } from '../types/PfImage';
import ShareButton from './ShareButton';

type ImagePreviewProps = {
	image: PfImage;
	path: string;
	isLoading?: boolean;
	closePreview?: () => void;
	loadComplete?: () => void;
	hasNavigator?: boolean;
	isFirstImage?: boolean;
};

const ImagePreview = ({
	image,
	path,
	isLoading,
	closePreview,
	loadComplete,
	hasNavigator = true,
	isFirstImage = true,
}: ImagePreviewProps) => {
	const [screenWidth, setScreenWidth] = useState(0);

	useEffect(() => {
		if (isLoading) return;
		const htmlEl = document.getElementsByTagName('html')[0];
		htmlEl.scrollTop = 0;
	}, [isLoading]);

	useEffect(() => {
		setScreenWidth(window.screen.width);
	}, []);

	return (
		<>
			<div
				className={`${
					isFirstImage ? 'mt-20' : '-mt-32'
				} flex flex-col w-full h-auto  items-center`}
			>
				{!!path && (
					<div className='flex max-h-[650px] h-screen sm:max-h-screen sm:h-[80vh] w-full max-w-3xl flex-col rounded-md'>
						<div
							style={{
								maxHeight: screenWidth,
								minHeight: 150,
							}}
							className={`relative flex w-full justify-center bg-black`}
						>
							{isLoading && (
								<img
									className='absolute left-0 right-0 top-0 bottom-0 m-auto w-16 h-16 z-50'
									src='/images/loader.svg'
								/>
							)}
							<Image
								onLoad={() => loadComplete?.()}
								className='flex object-contain w-auto h-auto'
								width='0'
								height='0'
								src={path}
								alt={path}
								quality={100}
								priority={true}
								sizes='100vw'
								style={{
									width: screenWidth,
									height: 'auto',
								}}
							/>
							{!isLoading &&
								image.location &&
								image.locationUrl && (
									<a
										href={image.locationUrl}
										target='_blank'
										rel='noreferrer'
										className='absolute text-sm flex flex-row items-center bg-black bg-opacity-70 m-1.5 pl-1 pr-2 py-1 rounded right-0 max-w-[90%]'
									>
										<IoLocationSharp className='mr-1' />
										<span className='flex truncate max-w-[100%]'>
											{image.location}
										</span>
									</a>
								)}

							{!isLoading && hasNavigator && (
								<ImageNavigator id={image.id} />
							)}
						</div>

						{!isLoading && (
							<div className='mt-1.5 px-3 flex flex-row '>
								<div className='flex flex-col flex-1 whitespace-pre-wrap'>
									{image.description && (
										<p className='mb-2'>
											{image.description}
										</p>
									)}
									{image.createdAt && (
										<p className='text-xs opacity-60'>
											{format(
												image.createdAt,
												'd MMM yyyy'
											)}
										</p>
									)}
								</div>
								<div className='mt-0.5 -mr-1'>
									<ShareButton
										title={image.title}
										description={image.description}
										url={
											process.env.NEXT_PUBLIC_WEB_URL +
											'/gallery/' +
											image.id
										}
									/>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
};

const ImageNavigator = ({ id }: { id: string }) => {
	// const swipeAreaRef = useRef(null);

	// useSwipe<HTMLDivElement>({
	// 	ref: swipeAreaRef,
	// 	onLeftSwipe: () => onPrev(),
	// 	onRightSwipe: () => onNext(),
	// });

	const router = useRouter();

	const currentIndex = images.findIndex((img) => img.id === id);
	const prevImg = currentIndex > 0 ? images[currentIndex - 1] : null;
	const nextImg =
		currentIndex < images.length ? images[currentIndex + 1] : null;

	const onPrev = () => {
		if (!prevImg) return;
		router.push(prevImg.id);
	};

	const onNext = () => {
		if (!nextImg) return;
		router.push(nextImg.id);
	};

	return (
		<>
			<div
				// ref={swipeAreaRef}
				className='absolute flex self-center justify-center items-center w-[60%] h-[60%] z-10'
			/>

			<div className='absolute flex self-center left-2 sm:left-4'>
				{!!prevImg && (
					<FaChevronLeft
						onClick={onPrev}
						className='cursor-pointer text-4xl bg-black bg-opacity-30 rounded-full p-1.5'
					/>
				)}
			</div>
			<div className='absolute flex self-center right-2 sm:right-4'>
				{!!nextImg && (
					<FaChevronRight
						onClick={onNext}
						className='cursor-pointer text-4xl bg-black bg-opacity-30 rounded-full p-1.5'
					/>
				)}
			</div>
		</>
	);
};

export default ImagePreview;
