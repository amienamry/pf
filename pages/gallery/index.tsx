import MainLayout from "../../components/MainLayout";
import { MetaDataType } from "../../types/MetaData";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { shuffle } from "../../lib/ArrayHelper";

const images = shuffle(Array.from(Array(72).keys()));

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
	const [size, setSize] = useState(0);
	const imgContainerRef = useRef<HTMLDivElement>();

	useEffect(() => {
		const containerWidth =
			imgContainerRef.current.getBoundingClientRect().width;
		setSize(containerWidth / 3);
	}, [imgContainerRef]);

	return (
		<div className="flex flex-1 max-w-screen-xl mt-16 sm:mt-20 -mb-20 px-0 pt-2.5 sm:p-5 flex-col md:flex-row bg-black bg-opacity-40 rounded-md">
			<div
				ref={imgContainerRef}
				className="flex flex-row flex-wrap w-full mt-3 sm:mt-12"
			>
				{images.map((image) => {
					const name = `amienamry${image}.jpeg`;
					return (
						<div
							key={name}
							className="relative"
							style={{ width: size, height: size }}
						>
							<Image
								fill={true}
								src={`/images/gallery/${name}`}
								alt={name}
								className="object-cover"
								quality={size > 250 ? 15 : 5}
								sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Gallery;
