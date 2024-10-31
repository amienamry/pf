import MainLayout from '../../components/MainLayout';
import { MetaDataType } from '../../types/MetaData';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { images as IMAGES } from '../../mock/images';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { isMobile } from '../../helpers';

const Gallery = ({ isMobile }) => {
	const metaData: MetaDataType = {
		title: 'Amien Amry | Sedikit gambar buat kudap kudap',
		description: `dung gudung gudung mak nak ikut tak payah, dung gudung gudung dunggudung gudung`,
		image_url: 'https://amienamry.dev/images/logo/gallery.png',
		path: 'https://amienamry.dev/gallery',
	};

	return (
		<MainLayout
			metaData={metaData}
			Content={() => <Content isMobile={isMobile} />}
		/>
	);
};

const Content = ({ isMobile }) => {
	const router = useRouter();
	const [images, setImages] = useState([]);
	const [size, setSize] = useState(0);
	const [minHeight, setMinHeight] = useState(5000);

	const imgContainerRef = useRef<HTMLDivElement>();

	const handleSize = () => {
		const containerWidth =
			imgContainerRef.current.getBoundingClientRect().width;
		setSize(containerWidth / 3);

		delayedHeightChange();
	};

	const delayedHeightChange = () => {
		setTimeout(() => {
			setMinHeight(imgContainerRef.current.offsetHeight);
		});
	};

	useEffect(() => {
		delayedHeightChange();

		handleSize();

		setImages(IMAGES);

		window.addEventListener('orientationchange', handleSize);

		window.addEventListener('resize', handleSize);

		return () => {
			window.removeEventListener('orientationchange', handleSize);
			window.removeEventListener('resize', handleSize);
		};
	}, []);

	return (
		<div className='flex flex-1 max-w-screen-lg mt-16 sm:mt-20 -mb-20 px-0 pt-2.5 sm:p-5 flex-col md:flex-row bg-black bg-opacity-90 rounded-md'>
			<div
				style={{
					minHeight,
				}}
				className='flex w-full'
			>
				<div
					ref={imgContainerRef}
					className='flex flex-row flex-wrap w-full mt-3 sm:mt-12 h-fit'
				>
					{images.map((image, i) => {
						return (
							<div
								key={image.id}
								className='relative border border-neutral-900'
								style={{ width: size, height: size }}
								onClick={() => {
									isMobile
										? router.push(
												`/gallery-scroll?i=${image.id}`
										  )
										: router.push(`/gallery/${image.id}`);
								}}
							>
								<Image
									fill={true}
									src={image.path}
									alt={image.path}
									className='object-cover cursor-pointer hover:contrast-125 ease-in duration-100'
									quality={size > 250 ? 15 : 5}
									sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
									placeholder='blur'
									blurDataURL='/images/blink.svg'
									priority={i < 14}
								/>
							</div>
						);
					})}
				</div>
			</div>
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
export default Gallery;
