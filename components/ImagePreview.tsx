import Image from "next/image";

type ImagePreviewProps = {
	path: string;
	isOpen: boolean;
	isLoading?: boolean;
	closePreview?: () => void;
	loadComplete?: () => void;
};

export const ImagePreview = ({
	path,
	isOpen,
	isLoading,
	closePreview,
	loadComplete,
}: ImagePreviewProps) => {
	if (!isOpen) return null;

	return (
		<div className="bg-black z-20 fixed left-0 top-0 w-screen h-screen flex justify-center items-center">
			<img
				onClick={() => closePreview?.()}
				className="absolute right-1 top-1 z-50 h-12 w-12 drop-shadow-2xl"
				src="/images/x.svg"
			/>
			<Image
				onLoadingComplete={() => loadComplete?.()}
				className="object-contain z-30"
				fill={true}
				src={path}
				alt={path}
				quality={100}
				priority={true}
			/>
			{isLoading && (
				<img className="w-16 h-16 z-50" src="/images/loader.svg" />
			)}
		</div>
	);
};
