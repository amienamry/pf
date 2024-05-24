import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { PfImage } from "../types/PfImage";
import { IoShareSocialOutline } from "react-icons/io5";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	RedditIcon,
	RedditShareButton,
	TelegramIcon,
	TelegramShareButton,
	TumblrIcon,
	TumblrShareButton,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
	XIcon,
} from "react-share";

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
	const [isOpen, setIsOpen] = useState(false);
	const [bottomSheetHeight, setBottomSheetHeight] = useState<{
		prev?: number;
		current?: number;
	}>({
		prev: null,
		current: null,
	});
	const bottomSheetRef = useRef<BottomSheetRef>();

	useEffect(() => {
		if (isLoading) return;
		const htmlEl = document.getElementsByTagName("html")[0];
		htmlEl.scrollTop = 0;
	}, [isLoading]);

	useEffect(() => {
		if (bottomSheetHeight.current < bottomSheetHeight.prev) {
			setIsOpen(false);
		}
	}, [bottomSheetHeight]);

	const onShare = () => {
		setIsOpen(true);
	};

	const onSpringStart = () => {
		setBottomSheetHeight({
			...bottomSheetHeight,
			prev: bottomSheetRef.current.height,
		});
	};

	const onSpringEnd = () => {
		setBottomSheetHeight({
			...bottomSheetHeight,
			current: bottomSheetRef.current.height,
		});
	};

	let url = "";

	if (typeof window !== "undefined" && window.location) {
		url = `${window.location.origin}${window.location.pathname}`;
	}

	const ShareName = ({ children }) => {
		return <span className="flex mt-2 text-sm opacity-80">{children}</span>;
	};
	return (
		<>
			<div className="flex flex-col w-full h-auto mt-20 items-center">
				{!!path && (
					<div className="flex min-h-screen w-full max-w-3xl flex-col bg-black bg-opacity-80 rounded-md">
						<div
							style={{
								maxHeight: window.screen.width,
								minHeight: 150,
							}}
							className={`relative flex w-full justify-center bg-black`}
						>
							{isLoading && (
								<img
									className="absolute left-0 right-0 top-0 bottom-0 m-auto w-16 h-16 z-50"
									src="/images/loader.svg"
								/>
							)}
							<Image
								onLoad={() => loadComplete?.()}
								className="flex  object-contain sm:rounded-lg w-auto h-auto"
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
									target="_blank"
									rel="noreferrer"
									className="absolute text-sm flex flex-row items-center bg-black bg-opacity-70 m-1.5 pl-1 pr-2 py-1 rounded right-0"
								>
									<IoLocationSharp className="mr-1" />
									{image.location}
								</a>
							)}
						</div>

						<div className="mt-4 px-4 flex flex-row ">
							<div className="flex flex-col flex-1">
								{image.description && (
									<p className="mb-2">{image.description}</p>
								)}
								{image.createdAt && (
									<p className="text-xs opacity-60">
										{format(
											image.createdAt,
											"eeee, d MMM yyyy"
										)}
									</p>
								)}
							</div>
							<div>
								<IoShareSocialOutline
									className="cursor-pointer"
									onClick={() => onShare()}
									fontSize={24}
								/>
							</div>
						</div>
					</div>
				)}
			</div>

			<BottomSheet
				className="text-white"
				ref={bottomSheetRef}
				expandOnContentDrag={true}
				onDismiss={() => setIsOpen(false)}
				onSpringStart={onSpringStart}
				onSpringEnd={onSpringEnd}
				snapPoints={({ maxHeight }) => [20, maxHeight * 0.5]}
				defaultSnap={(props) => props.snapPoints[1]}
				open={isOpen}
				initialFocusRef={false}
			>
				<div className="p-4">
					<h5 className="ml-1 pb-4">Share la bunk:</h5>
					<div className="grid grid-cols-4 gap-4 justify-between">
						<WhatsappShareButton
							className="flex flex-col items-center"
							url={url}
							title={`${image.title} - ${image.description}`}
						>
							<WhatsappIcon round={true} />
							<ShareName>Whatsapp</ShareName>
						</WhatsappShareButton>

						<LinkedinShareButton
							className="flex flex-col items-center"
							url={url}
							title={image.title}
							summary={image.description}
							source="@amienamry"
						>
							<LinkedinIcon round={true} />
							<ShareName>LinkedIn</ShareName>
						</LinkedinShareButton>

						<TwitterShareButton
							className="flex flex-col items-center"
							url={url}
							title={`${image.title} - ${image.description}`}
							related={["amienamry"]}
						>
							<XIcon round={true} />
							<ShareName>Twitter</ShareName>
						</TwitterShareButton>

						<TelegramShareButton
							className="flex flex-col items-center"
							url={url}
							title={`${image.title} - ${image.description}`}
						>
							<TelegramIcon round={true} />
							<ShareName>Telegram</ShareName>
						</TelegramShareButton>

						<FacebookShareButton
							className="flex flex-col items-center"
							url={url}
							hashtag={`#${image.title
								.split(" ")
								.join("")} #${image.description
								.split(" ")
								.join("")}`}
						>
							<FacebookIcon round={true} />
							<ShareName>Facebook</ShareName>
						</FacebookShareButton>

						<RedditShareButton
							className="flex flex-col items-center"
							url={url}
							title={`${image.title} - ${image.description}`}
						>
							<RedditIcon round={true} />
							<ShareName>Reddit</ShareName>
						</RedditShareButton>

						<TumblrShareButton
							className="flex flex-col items-center"
							url={url}
							title={image.title}
							caption={image.description}
						>
							<TumblrIcon round={true} />
							<ShareName>Tumblr</ShareName>
						</TumblrShareButton>

						<EmailShareButton
							className="flex flex-col items-center"
							url={url}
							subject={image.title}
							body={image.description}
						>
							<EmailIcon round={true} />
							<ShareName>Email</ShareName>
						</EmailShareButton>
					</div>
				</div>
			</BottomSheet>
		</>
	);
};
