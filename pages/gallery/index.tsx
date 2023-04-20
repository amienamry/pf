import MainLayout from "../../components/MainLayout";
import { MetaDataType } from "../../types/MetaData";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useImagePreview } from "../../hooks/useImagePreview";
import { ImagePreview } from "../../components/ImagePreview";
import { images as IMAGES } from "../../mock/images";

const Gallery = () => {
	const metaData: MetaDataType = {
		title: "Amien Amry | Gallery",
		description: "My gallery",
		image_url: "https://amienamry.dev/images/logo/gallery.png",
		path: "https://amienamry.dev/gallery",
	};

	return <MainLayout metaData={metaData} Content={() => <Content />} />;
};

const Content = () => {
	const [images, setImages] = useState([]);
	const { path, isOpen, isLoading, openPreview, closePreview, loadComplete } =
		useImagePreview();
	const [size, setSize] = useState(0);
	const imgContainerRef = useRef<HTMLDivElement>();

	const handleWidth = () => {
		const containerWidth =
			imgContainerRef.current.getBoundingClientRect().width;
		setSize(containerWidth / 3);
	};

	useEffect(() => {
		setImages(IMAGES);

		window.addEventListener("resize", handleWidth);

		return () => window.removeEventListener("resize", handleWidth);
	}, []);

	useEffect(() => {
		handleWidth();
	}, [imgContainerRef]);

	return (
		<div className="flex flex-1 max-w-screen-xl mt-16 sm:mt-20 -mb-20 px-0 pt-2.5 sm:p-5 flex-col md:flex-row bg-black bg-opacity-40 rounded-md">
			<div
				ref={imgContainerRef}
				className="flex flex-row flex-wrap w-full mt-3 sm:mt-12"
			>
				{images.map((image) => {
					return (
						<div
							key={image.path}
							className="relative border border-neutral-900"
							style={{ width: size, height: size }}
							onClick={() => openPreview(image.path)}
						>
							<Image
								fill={true}
								src={image.path}
								alt={image.path}
								className="object-cover"
								quality={size > 250 ? 15 : 5}
								sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
								placeholder="blur"
								blurDataURL="/images/blink.svg"
							/>
						</div>
					);
				})}
			</div>

			<ImagePreview
				path={path}
				isOpen={isOpen}
				isLoading={isLoading}
				closePreview={closePreview}
				loadComplete={loadComplete}
			/>
		</div>
	);
};

export default Gallery;
