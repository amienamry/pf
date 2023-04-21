import Image from "next/image";

type ImagePreviewProps = {
	path: string;
	isLoading?: boolean;
	closePreview?: () => void;
	loadComplete?: () => void;
};

export const ImagePreview = ({
	path,
	isLoading,
	closePreview,
	loadComplete,
}: ImagePreviewProps) => {
	return (
		<div className="bg-black z-20 fixed left-0 top-0 w-screen h-screen flex justify-center items-center">
			<img
				onClick={() => closePreview?.()}
				className="absolute right-0.5 top-0.5 z-50 h-10 w-10 drop-shadow-2xl cursor-pointer"
				src="/images/x.svg"
			/>

			{!!path && (
				<Image
					onLoadingComplete={() => loadComplete?.()}
					className="object-contain z-30"
					fill={true}
					src={path}
					alt={path}
					quality={100}
					priority={true}
				/>
			)}

			{isLoading && (
				<img className="w-16 h-16 z-50" src="/images/loader.svg" />
			)}
		</div>
	);
};
