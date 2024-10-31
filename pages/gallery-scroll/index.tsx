import { GetServerSidePropsContext } from 'next';
import { isMobile } from '../../helpers';
import { useSearchParams } from 'next/navigation';
import { images } from '../../mock/images';
import ImagePreview from '../../components/ImagePreview';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { defaultMetaData } from '../../constants';
import { PfImage } from '../../types/PfImage';
import redirect from 'nextjs-redirect';

const GalleryScroll = ({ isMobile }) => {
	const searchParams = useSearchParams();
	const id = searchParams.get('i');

	if (!isMobile && id) {
		const Redirect = redirect(
			`${process.env.NEXT_PUBLIC_WEB_URL}/gallery/${id}`
		);
		return <Redirect />;
	}

	if (!isMobile && !id) {
		const Redirect = redirect(`${process.env.NEXT_PUBLIC_WEB_URL}/gallery`);
		return <Redirect />;
	}

	return (
		<MainLayout
			metaData={defaultMetaData}
			Content={() => <Content id={id} />}
		/>
	);
};

const Content = ({ id }: { id: string }) => {
	const imageRef = useRef<HTMLDivElement | null>();
	const [allImagesLoaded, setAllImagesLoaded] = useState(false);

	const currentIndex = images.findIndex((img) => img.id === id);

	if (currentIndex < 0) {
		const Redirect = redirect(`${process.env.NEXT_PUBLIC_WEB_URL}/gallery`);
		return <Redirect />;
	}

	const loaded = () => {
		setAllImagesLoaded(true);
	};

	useEffect(() => {
		if (allImagesLoaded) {
			document.documentElement.style.overflowY = 'auto';

			setTimeout(() => {
				if (imageRef.current) {
					const topOffset = 80;
					const elementPosition =
						imageRef.current.getBoundingClientRect().top +
						window.scrollY;
					const offsetPosition = elementPosition - topOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: 'instant',
					});
				}
			}, 50);
		} else {
			document.documentElement.style.overflowY = 'hidden';
		}
	}, [allImagesLoaded]);

	return (
		<div>
			{!allImagesLoaded && <Loader />}
			{images.map((image, index) => {
				return (
					<Image101
						key={image.path + image.id}
						image={image}
						index={index}
						loaded={() => loaded()}
						currentImage={currentIndex === index ? imageRef : null}
					/>
				);
			})}
		</div>
	);
};

const Image101 = ({
	image,
	index,
	loaded,
	currentImage = null,
}: {
	image: PfImage;
	index: number;
	loaded: () => void;
	currentImage?: MutableRefObject<HTMLDivElement>;
}) => {
	const imgRef = useRef<null | HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (currentImage) {
			currentImage.current = imgRef.current;
		}
	}, []);

	const loadComplete = () => {
		setIsLoading(false);
	};

	useEffect(() => {
		if (!isLoading && images.length - 1 === index) {
			loaded();
		}
	}, [isLoading]);

	return (
		<div ref={imgRef}>
			<ImagePreview
				image={image}
				path={image.path}
				isLoading={isLoading}
				loadComplete={() => loadComplete()}
				hasNavigator={false}
				isFirstImage={index === 0}
			/>
		</div>
	);
};

const Loader = () => {
	return (
		<div className='z-10 bg-black w-screen h-screen relative mt-20'>
			<img
				className='absolute left-0 right-0 -top-36 bottom-0 m-auto w-16 h-16 z-50'
				src='/images/loader.svg'
			/>
		</div>
	);
};

export const getServerSideProps = (ctx?: GetServerSidePropsContext) => {
	return {
		props: {
			isMobile: isMobile(ctx),
			backToButtonConfig: {
				show: true,
				path: '/gallery',
				name: 'Gallery',
			},
		},
	};
};

export default GalleryScroll;
