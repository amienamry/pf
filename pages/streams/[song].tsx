import { MetaDataType } from "../../types/MetaData";
import MainLayout from "../../components/MainLayout";
import { useRouter } from "next/router";
import songs from "../../mock/songList";
import { Song, StreamingPlatform } from "../../types/Song";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { BsCheck2Square, BsPauseCircle, BsPlayCircle } from "react-icons/bs";
import { InputRange } from "../../components/InputRange";
import redirect from "nextjs-redirect";
import { IoLinkSharp } from "react-icons/io5";
import WaveSurfer from "wavesurfer.js";

let tabFocusInterval;

const Song = ({ isMobile }) => {
	const router = useRouter();

	const song = songs.find((sm) => sm.key === router.query.song);

	if (!router.isReady) return "Loading...";

	if (!song) {
		const Redirect = redirect("https://amienamry.dev");
		return <Redirect> Not found </Redirect>;
	}

	const metaData: MetaDataType = {
		title: song.fullTitle,
		description: song.description,
		image_url: `https://amienamry.dev${song.imgThumb}`,
		path: `https://amienamry.dev/streams/${song.key}`,
	};

	return (
		<MainLayout
			metaData={metaData}
			Content={() => <Content song={song} isMobile={isMobile} />}
		/>
	);
};

const Content = ({ song, isMobile }: { song: Song; isMobile: boolean }) => {
	const router = useRouter();
	const [isPlaying, setIsPlaying] = useState(false);
	const [loadFailed, setLoadFailed] = useState<null | boolean>(null);
	const [isReady, setIsReady] = useState(false);
	const [volume, setVolume] = useState(isMobile ? 1 : 0.65);
	const [waveSurfer, setWaveSurfer] = useState<undefined | WaveSurfer>(
		undefined
	);
	const [linkCopied, setLinkCopied] = useState(false);

	const initWaveSurfer = async () => {
		if (!song || waveSurfer) return;

		const waveInstance = WaveSurfer.create({
			container: "#waveform",
			waveColor: "#8a9c8e",
			progressColor: "#5A9367",
			height: 100,
			cursorColor: "#566b5b",
			cursorWidth: 0,
		});

		waveInstance.load(song.audioUrl);

		waveInstance.setVolume(volume);

		waveInstance.on("finish", () => {
			setLoadFailed(false);
			setIsPlaying(false);
			waveInstance.setTime(0);
		});

		waveInstance.on("ready", () => {
			setIsReady(true);

			Array.from(
				document.getElementsByTagName(
					"wave"
				) as HTMLCollectionOf<HTMLElement>
			).forEach((el) => {
				el.style.cursor = "pointer";
			});
		});

		setWaveSurfer(waveInstance);
	};

	useEffect(() => {
		initWaveSurfer();
	}, [song]);

	useEffect(() => {
		if (!waveSurfer) return;

		listenToTabFocus();

		const handleRouteChange = () => {
			waveSurfer.destroy();
			setWaveSurfer(undefined);
			setIsPlaying(false);
		};

		router.events.on("routeChangeStart", handleRouteChange);

		return () => {
			clearInterval(tabFocusInterval);
			router.events.off("routeChangeStart", handleRouteChange);
		};
	}, [waveSurfer, router.events]);

	const listenToTabFocus = () => {
		if (tabFocusInterval) clearInterval(tabFocusInterval);

		tabFocusInterval = setInterval(() => {
			if (!document.hasFocus()) {
				waveSurfer.pause();
				setIsPlaying(false);
			}
		}, 1500);
	};

	const toggleAudio = () => {
		if (!waveSurfer && isReady) return;

		waveSurfer.isPlaying() ? waveSurfer.pause() : waveSurfer.play();

		setIsPlaying(waveSurfer.isPlaying());
	};

	const handleVolume = (volume: number) => {
		if (!waveSurfer && isReady) return;

		const newVolume = volume / 100;
		setVolume(newVolume);
		waveSurfer.setVolume(newVolume);
	};

	const handleCopyLink = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();

		navigator.clipboard.writeText(location.href);

		setLinkCopied(true);
	};

	return (
		<>
			<div className="fixed top-[-50%] left-[-50%] w-[200%] h-[200%] bg-black z-[-100] overflow-hidden">
				<img
					className="absolute top-0 left-0 right-0 bottom-0 m-auto min-w-[55%] min-h-[55%] blur-lg opacity-30"
					src={song.imgBg}
				/>
			</div>
			<div className="flex flex-col w-full max-w-2xl pt-32 sm:pt-48 text-gray-100 px-4 sm:px-0">
				<div className="relative w-full flex flex-col items-center sm:bg-neutral-800 sm:bg-opacity-30 rounded-xl mb-5">
					<button
						onClick={(e) => handleCopyLink(e)}
						className={`${
							linkCopied
								? "sm:text-[#5A9367]"
								: "sm:text-neutral-400 sm:hover:bg-neutral-900"
						} absolute top-1 right-0.5 z-[1] hidden sm:flex flex-row items-center shadow-2xl px-2 py-0.5 rounded`}
					>
						<span className="hidden sm:flex text-sm mr-1">
							{linkCopied
								? "URL copied to clipboard"
								: "Copy URL"}
						</span>{" "}
						{linkCopied ? (
							<BsCheck2Square className="h-7 w-7 sm:h-4 sm:w-4" />
						) : (
							<IoLinkSharp className="h-7 w-7 sm:h-4 sm:w-4" />
						)}
					</button>

					<div className="relative w-48 h-48 -mt-8 mb-6">
						<div className="absolute top-1.5 left-1.5 sm:hidden z-[1] text-sm bg-black py-0.5 px-1.5 rounded bg-opacity-40">
							{song.genre}
						</div>

						<Image
							className="absolute rounded-xl"
							alt={`${song.title}'s album cover`}
							src={song.imgThumb}
							fill={true}
							priority={true}
						/>

						<button
							onClick={(e) => handleCopyLink(e)}
							className={`${
								linkCopied
									? "sm:text-[#5A9367]"
									: "sm:text-neutral-400 sm:hover:bg-neutral-900"
							} absolute top-1 right-0 z-[1] flex sm:hidden flex-row items-center shadow-2xl px-2 py-0.5 rounded`}
						>
							<span className="hidden sm:flex text-sm mr-1">
								{linkCopied
									? "URL copied to clipboard"
									: "Copy URL"}
							</span>{" "}
							{linkCopied ? (
								<BsCheck2Square className="h-6 w-6 sm:h-4 sm:w-4" />
							) : (
								<IoLinkSharp className="h-6 w-6 sm:h-4 sm:w-4" />
							)}
						</button>
					</div>

					<h1 className="text-3xl font-bold mb-2 text-center px-4">
						{song.title}
					</h1>
					<h3 className="text-lg mb-3 sm:mb-8 px-4">{song.artist}</h3>
				</div>

				<div className="w-full flex flex-row items-center bg-neutral-700 bg-opacity-30  rounded-xl mb-5">
					<button
						disabled={!isReady}
						onClick={() => toggleAudio()}
						className={`${
							isReady ? "hover:bg-opacity-70" : ""
						} z-[4] w-[80px] h-[100px] rounded-l-xl flex justify-center items-center bg-neutral-700 bg-opacity-50`}
						style={{
							boxShadow: "5px 0px 10px -5px rgba(0,0,0,0.75)",
						}}
					>
						{isPlaying ? (
							<BsPauseCircle className="h-10 w-10 text-[#5A9367]" />
						) : (
							<BsPlayCircle className="h-10 w-10 text-gray-100" />
						)}
					</button>

					<div id="waveform" className="relative w-full h-full">
						<span className="absolute select-none z-[4] text-xs py-1 px-2.5 bg-neutral-700 bg-opacity-50 rounded-br-lg">
							{isReady ? (
								<>
									Preview: <b>{song.title}</b>
								</>
							) : (
								<span className="flex flex-row items-end">
									{loadFailed === true
										? "Fail to load audio 🙁"
										: "Loading"}
									{!loadFailed && (
										<img
											className="h-4 w-4 ml-[1px] -mb-0.5 flex"
											src="/images/blinking-ellipsis.svg"
										/>
									)}
								</span>
							)}
						</span>
					</div>

					{!isMobile && (
						<InputRange
							onChange={(e) => handleVolume(+e.target.value)}
							value={volume * 100}
							disabled={!isReady}
						/>
					)}
				</div>

				{song.platforms.map((platform) => (
					<Platform
						key={platform.name + platform.url}
						platform={platform}
					/>
				))}
			</div>
		</>
	);
};

const Platform = ({ platform }: { platform: StreamingPlatform }) => {
	return (
		<div className="w-full flex flex-row items-center bg-neutral-700 rounded-xl mb-5 hover:bg-opacity-70 bg-opacity-50">
			<Link
				className="w-full flex flex-row"
				href={platform.url}
				target="_blank"
			>
				<Image
					className="rounded-l-xl"
					alt={`${platform.name}'s logo`}
					src={platform.imgUrl}
					width={65}
					height={65}
					style={{
						boxShadow: "0px 0px 5px #000000",
					}}
				/>
				<div className="flex flex-row w-full items-center justify-between px-4">
					<p className="font-semibold">{platform.name}</p>

					<FaChevronRight />
				</div>
			</Link>
		</div>
	);
};

export const getServerSideProps = (ctx) => {
	const userAgent = ctx?.req
		? ctx.req.headers["user-agent"]
		: navigator.userAgent;

	return {
		props: {
			isMobile: !!userAgent.match(
				/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
			),
		},
	};
};

export default Song;
