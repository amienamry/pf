import { GetServerSidePropsContext } from 'next';
import { isMobile } from '../../helpers';
import { useSearchParams } from 'next/navigation';
import { images } from '../../mock/images';
import ImagePreview from '../../components/ImagePreview';
import { useImagePreview } from '../../hooks/useImagePreview';
import { useEffect, useRef, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import { defaultMetaData } from '../../constants';
import { PfImage } from '../../types/PfImage';

const GalleryScroll = ({ isMobile }) => {
	if (!isMobile) {
		// TODO: redirect default view - gallery/{id}
	}

	const searchParams = useSearchParams();

	const id = searchParams.get('i');

	if (!id) {
		// TODO: redirect home
	}

	return (
		<MainLayout
			metaData={defaultMetaData}
			Content={() => <Content id={id} />}
		/>
	);
};

const Content = ({ id }: { id: string }) => {
	const [currentImgRef, setCurrentImgRef] = useState<{
		current: HTMLDivElement;
	}>(null);
	const [toRenderImages, setToRenderImages] = useState<PfImage[]>([]);

	const indexCurrent = images.findIndex((img) => img.id === id);

	if (indexCurrent < 0) {
		// TODO: redirect home
	}

	useEffect(() => {
		const _toRenderImages: PfImage[] = [];

		const indexBefore = indexCurrent - 1;
		if (indexBefore !== -1) {
			_toRenderImages.push(images[indexBefore]);
		}

		_toRenderImages.push(images[indexCurrent]);

		const indexAfter = indexCurrent + 1;
		if (images[indexAfter]) {
			_toRenderImages.push(images[indexAfter]);
		}

		setToRenderImages(_toRenderImages);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (indexCurrent !== 0 && currentImgRef?.current) {
				const topOffset = 80;
				const elementPosition =
					currentImgRef.current.getBoundingClientRect().top +
					window.scrollY;
				const offsetPosition = elementPosition - topOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'instant',
				});
			}
		});
	}, [currentImgRef]);

	return (
		<div>
			{toRenderImages.map((image, index) => {
				return (
					<Image101
						setCurrentImgRef={setCurrentImgRef}
						key={image.path + image.id}
						image={image}
						index={index}
					/>
				);
			})}
		</div>
	);
};

const Image101 = ({
	image,
	index,
	setCurrentImgRef,
}: {
	image: PfImage;
	index: number;
	setCurrentImgRef;
}) => {
	const imgRef = useRef<null | HTMLDivElement>(null);

	const { path, isLoading, openPreview, closePreview, loadComplete } =
		useImagePreview();

	useEffect(() => {
		openPreview(image);
	}, []);

	return (
		<div ref={imgRef}>
			<ImagePreview
				image={image}
				path={path}
				isLoading={isLoading}
				closePreview={closePreview}
				loadComplete={() => {
					loadComplete();

					setTimeout(() => {
						if (index === 1 && imgRef?.current) {
							setCurrentImgRef(imgRef);
						}
					}, 50);
				}}
				hasNavigator={false}
				isFirstImage={index === 0}
			/>
		</div>
	);
};

export const getServerSideProps = (ctx?: GetServerSidePropsContext) => {
	return {
		props: {
			isMobile: isMobile(ctx),
		},
	};
};

export default GalleryScroll;
