import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FiLink } from "react-icons/fi";
import { RiShareBoxLine } from "react-icons/ri";
import {
	WhatsappShareButton,
	WhatsappIcon,
	LinkedinShareButton,
	LinkedinIcon,
	TwitterShareButton,
	XIcon,
	TelegramShareButton,
	TelegramIcon,
	FacebookShareButton,
	FacebookIcon,
	RedditShareButton,
	RedditIcon,
	TumblrShareButton,
	TumblrIcon,
} from "react-share";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";

type ShareButtonProps = {
	title: string;
	description: string;
	url?: string;
	className?: string;
};

const ShareName = ({ children }) => {
	return <span className="flex mt-2 text-sm opacity-80">{children}</span>;
};

const ShareButton = ({
	className,
	title,
	description,
	url,
}: ShareButtonProps) => {
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
		if (bottomSheetHeight.current < bottomSheetHeight.prev) {
			setIsOpen(false);
		}
	}, [bottomSheetHeight]);

	const onShare = () => {
		setIsOpen(true);
	};

	if (typeof window !== "undefined" && window.location && !url) {
		url = `${window.location.origin}${window.location.pathname}`;
	}

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

	return (
		<>
			<RiShareBoxLine
				className={`cursor-pointer ${className}`}
				onClick={() => onShare()}
				fontSize={24}
			/>

			<BottomSheet
				className="text-white z-[5]"
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
							onClick={() => setIsOpen(false)}
							className="flex flex-col items-center"
							url={url}
						>
							<WhatsappIcon round={true} />
							<ShareName>Whatsapp</ShareName>
						</WhatsappShareButton>
						<LinkedinShareButton
							onClick={() => setIsOpen(false)}
							className="flex flex-col items-center"
							url={url}
							title={title}
							summary={description}
							source="@amienamry"
						>
							<LinkedinIcon round={true} />
							<ShareName>LinkedIn</ShareName>
						</LinkedinShareButton>
						<TwitterShareButton
							onClick={() => setIsOpen(false)}
							className="flex flex-col items-center"
							url={url}
							title={`${title} - ${description}`}
							related={["amienamry"]}
						>
							<XIcon round={true} />
							<ShareName>Twitter</ShareName>
						</TwitterShareButton>
						<TelegramShareButton
							onClick={() => setIsOpen(false)}
							className="flex flex-col items-center"
							url={url}
						>
							<TelegramIcon round={true} />
							<ShareName>Telegram</ShareName>
						</TelegramShareButton>
						<FacebookShareButton
							onClick={() => setIsOpen(false)}
							className="flex flex-col items-center"
							url={url}
							hashtag={`#${title
								.split(" ")
								.join("")} #${description.split(" ").join("")}`}
						>
							<FacebookIcon round={true} />
							<ShareName>Facebook</ShareName>
						</FacebookShareButton>
						<RedditShareButton
							onClick={() => setIsOpen(false)}
							className="flex flex-col items-center"
							url={url}
							title={`${title} - ${description}`}
						>
							<RedditIcon round={true} />
							<ShareName>Reddit</ShareName>
						</RedditShareButton>
						<TumblrShareButton
							onClick={() => setIsOpen(false)}
							className="flex flex-col items-center"
							url={url}
							title={title}
							caption={description}
						>
							<TumblrIcon round={true} />
							<ShareName>Tumblr</ShareName>
						</TumblrShareButton>
						<div
							onClick={() => {
								navigator.clipboard.writeText(
									`${window.location.origin}${window.location.pathname}`
								);
								setIsOpen(false);
								toast.success("Link copied to clipboard", {
									duration: 5000,
									icon: null,
									style: {
										borderRadius: "10px",
										background: "#333",
										color: "#fff",
									},
								});
							}}
							className="flex flex-col items-center cursor-pointer"
						>
							<div className="flex flex-col w-[64px] h-[64px] justify-center items-center rounded-full bg-gray-600">
								<FiLink className="w-[45%] h-[45%]" />
							</div>
							<span className="text-sm mt-2 opacity-80">
								Copy Link
							</span>
						</div>
					</div>
				</div>
			</BottomSheet>
		</>
	);
};

export default ShareButton;
