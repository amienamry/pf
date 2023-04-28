import { MetaDataType } from "../../types/MetaData";
import MainLayout from "../../components/MainLayout";
import { useRouter } from "next/router";
import songs from "../../mock/songList";
import { Song, StreamingPlatform } from "../../types/Song";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

const Song = () => {
	const router = useRouter();

	const song = songs.find((sm) => sm.key === router.query.song);

	if (!song) {
		return "song not found";
	}

	const metaData: MetaDataType = {
		title: song.fullTitle,
		description: song.description,
		image_url: song.imgThumb,
		path: `https://amienamry.dev/streams/${song.key}`,
	};

	return (
		<MainLayout
			metaData={metaData}
			Content={() => <Content song={song} />}
		/>
	);
};

const Content = ({ song }: { song: Song }) => {
	return (
		<>
			<div className="fixed top-[-50%] left-[-50%] w-[200%] h-[200%] bg-black z-[-100] overflow-hidden">
				<img
					className="absolute top-0 left-0 right-0 bottom-0 m-auto min-w-[55%] min-h-[55%] blur-lg opacity-30"
					src={song.imgBg}
				/>
			</div>
			<div className="flex flex-col w-full max-w-2xl pt-20 sm:pt-36 text-gray-100 px-4 sm:px-0">
				<div className="w-full flex flex-col items-center sm:bg-neutral-800 rounded-xl mb-5 bg-opacity-75">
					<div className="relative w-48 h-48 -mt-8 mb-6">
						<Image
							className="absolute rounded-xl"
							alt={`${song.title}'s album cover`}
							src={song.imgThumb}
							fill={true}
						/>
					</div>

					<h1 className="text-3xl font-bold mb-2">{song.title}</h1>
					<h3 className="text-lg mb-3 sm:mb-8">{song.artist}</h3>
				</div>

				<div className="w-full flex flex-col items-center bg-neutral-700 rounded-xl mb-5">
					wave
				</div>

				{song.platforms.map((platform) => (
					<Platform platform={platform} />
				))}
			</div>
		</>
	);
};

const Platform = ({ platform }: { platform: StreamingPlatform }) => {
	return (
		<div className="w-full flex flex-row items-center bg-neutral-700 rounded-xl mb-5 hover:bg-neutral-700 bg-opacity-75">
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

export default Song;
