import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MutableRefObject, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { IoLocationSharp } from 'react-icons/io5';
import { useSwipe } from '../hooks/useSwipe';
import { images } from '../mock/images';
import { PfImage } from '../types/PfImage';
import ShareButton from './ShareButton';

type ImagePreviewProps = {
	image: PfImage;
	path: string;
	isLoading?: boolean;
	closePreview?: () => void;
	loadComplete?: () => void;
};

const ImagePreview = ({
	image,
	path,
	isLoading,
	closePreview,
	loadComplete,
}: ImagePreviewProps) => {
	const ref = useRef(null);

	useEffect(() => {
		if (isLoading) return;
		const htmlEl = document.getElementsByTagName('html')[0];
		htmlEl.scrollTop = 0;
	}, [isLoading]);

	return (
		<>
			<div className='flex flex-col w-full h-auto mt-20 items-center'>
				{!!path && (
					<div className='flex min-h-screen w-full max-w-3xl flex-col bg-black bg-opacity-80 rounded-md'>
						<div
							style={{
								maxHeight: window.screen.width,
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
								ref={ref}
								onLoad={() => loadComplete?.()}
								className='flex object-contain w-auto h-auto'
								width={window.screen.width}
								height={1000}
								src={path}
								alt={path}
								quality={100}
								priority={true}
							/>
							{image.location && image.locationUrl && (
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

							{!isLoading && (
								<ImageNavigator imageRef={ref} id={image.id} />
							)}
						</div>

						<div className='mt-4 px-4 flex flex-row '>
							<div className='flex flex-col flex-1'>
								{image.description && (
									<p className='mb-2'>{image.description}</p>
								)}
								{image.createdAt && (
									<p className='text-xs opacity-60'>
										{format(image.createdAt, 'd MMM yyyy')}
									</p>
								)}
							</div>
							<div>
								<ShareButton
									title={image.title}
									description={image.description}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

const ImageNavigator = ({
	id,
	imageRef,
}: {
	id: string;
	imageRef: MutableRefObject<HTMLImageElement>;
}) => {
	useSwipe<HTMLImageElement>({
		ref: imageRef,
		onLeftSwipe: () => onPrev(),
		onRightSwipe: () => onNext(),
	});

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
