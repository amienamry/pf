import format from "date-fns/format";
import Image from "next/image";
import { IoLocationSharp } from "react-icons/io5";
import { PfImage } from "../types/PfImage";

type ImagePreviewProps = {
	image: PfImage;
	path: string;
	isLoading?: boolean;
	closePreview?: () => void;
	loadComplete?: () => void;
};

export const ImagePreview = ({
	image,
	path,
	isLoading,
	closePreview,
	loadComplete,
}: ImagePreviewProps) => {
	return (
		<div className="flex flex-col w-full h-auto mt-20 items-center">
			{isLoading && (
				<div className="flex w-full h-96 items-center justify-center">
					<img
						className="flex w-16 h-16 z-50"
						src="/images/loader.svg"
					/>
				</div>
			)}

			{!!path && (
				<div className="flex min-h-screen w-full max-w-3xl flex-col bg-black bg-opacity-40 rounded-md">
					<div className="relative flex w-full max-h-[450px]">
						<Image
							onLoadingComplete={() => loadComplete?.()}
							className="flex object-cover w-full h-auto sm:rounded-lg"
							width={500}
							height={400}
							src={path}
							alt={path}
							quality={100}
							priority={true}
						/>

						{image.location && image.locationUrl && (
							<a
								href={image.locationUrl}
								target="_blank"
								rel="noreferrer"
								className="absolute text-sm flex flex-row items-center bg-black bg-opacity-50 m-1.5 pl-1 pr-2 py-1 rounded right-0"
							>
								<IoLocationSharp className="mr-1" />
								{image.location}
							</a>
						)}
					</div>

					<div className="mt-2 sm:mt-4 px-4">
						<p className="mb-2 text-xl">{image.description}</p>
						{image.createdAt && (
							<p className="text-sm opacity-60">
								{format(image.createdAt, "eeee, d MMM yyyy")}
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
