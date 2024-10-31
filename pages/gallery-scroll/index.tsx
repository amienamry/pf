import { GetServerSidePropsContext } from 'next';
import { isMobile } from '../../helpers';
import { useSearchParams } from 'next/navigation';
import { images } from '../../mock/images';
import ImagePreview from '../../components/ImagePreview';
import {
	Dispatch,
	MutableRefObject,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
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
	if (typeof document !== 'undefined') {
		document.documentElement.scrollTop = 0;
		document.documentElement.style.overflowY = 'hidden';
	}

	const [imageRef, setImageRef] = useState<
		MutableRefObject<HTMLDivElement | null>
	>(useRef());
	const [allImagesLoaded, setAllImagesLoaded] = useState(false);
	const [loadedImageCount, setLoadedImageCount] = useState(0);

	const currentIndex = images.findIndex((img) => img.id === id);

	if (currentIndex < 0) {
		const Redirect = redirect(`${process.env.NEXT_PUBLIC_WEB_URL}/gallery`);
		return <Redirect />;
	}

	useEffect(() => {
		if (loadedImageCount === images.length) {
			setAllImagesLoaded(true);
		}
	}, [loadedImageCount]);

	useEffect(() => {
		document.documentElement.style.overflowY = 'auto';

		if (imageRef?.current) {
			const topOffset = 80;
			const elementPosition =
				imageRef.current.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - topOffset;

			document.documentElement.scrollTo({
				top: offsetPosition,
				behavior: 'instant',
			});
		}
	}, [allImagesLoaded]);

	return (
		<div className='bg-black'>
			{!allImagesLoaded && <Loader />}
			{images.map((image, index) => {
				return (
					<Image101
						key={image.path + image.id}
						image={image}
						index={index}
						loaded={() => {
							setLoadedImageCount((prev) => prev + 1);
						}}
						setImageRef={
							currentIndex === index ? setImageRef : null
						}
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
	setImageRef = null,
}: {
	image: PfImage;
	index: number;
	loaded: () => void;
	setImageRef?: Dispatch<SetStateAction<MutableRefObject<HTMLDivElement>>>;
}) => {
	const imgRef = useRef<null | HTMLDivElement>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (setImageRef) {
			setImageRef(imgRef);
		}
	}, []);

	const loadComplete = () => {
		setIsLoading(false);
	};

	useEffect(() => {
		// if (!isLoading && images.length - 1 === index) {
		if (!isLoading) {
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
