import { useState, useRef, useEffect } from "react";
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
	EmailShareButton,
	EmailIcon,
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
							className="flex flex-col items-center"
							url={url}
						>
							<WhatsappIcon round={true} />
							<ShareName>Whatsapp</ShareName>
						</WhatsappShareButton>

						<LinkedinShareButton
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
							className="flex flex-col items-center"
							url={url}
							title={`${title} - ${description}`}
							related={["amienamry"]}
						>
							<XIcon round={true} />
							<ShareName>Twitter</ShareName>
						</TwitterShareButton>

						<TelegramShareButton
							className="flex flex-col items-center"
							url={url}
						>
							<TelegramIcon round={true} />
							<ShareName>Telegram</ShareName>
						</TelegramShareButton>

						<FacebookShareButton
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
							className="flex flex-col items-center"
							url={url}
							title={`${title} - ${description}`}
						>
							<RedditIcon round={true} />
							<ShareName>Reddit</ShareName>
						</RedditShareButton>

						<TumblrShareButton
							className="flex flex-col items-center"
							url={url}
							title={title}
							caption={description}
						>
							<TumblrIcon round={true} />
							<ShareName>Tumblr</ShareName>
						</TumblrShareButton>

						<EmailShareButton
							className="flex flex-col items-center"
							url={url}
							subject={title}
							body={description}
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

export default ShareButton;
