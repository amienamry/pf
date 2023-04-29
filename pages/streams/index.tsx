import MainLayout from "../../components/MainLayout";
import { useSongList } from "../../hooks/useSongList";
import { MetaDataType } from "../../types/MetaData";
import { Song } from "../../types/Song";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";

const Stream = () => {
	const metaData: MetaDataType = {
		title: `Amien Amry | My music as Arai Junior`,
		description:
			"Discover and stream songs, tracks and music playlists by Arai Junior.",
		image_url: "https://amienamry.dev/images/logo/music.png",
		path: "https://amienamry.dev/streams",
	};

	return <MainLayout metaData={metaData} Content={() => <Content />} />;
};

const Content = () => {
	const { songList } = useSongList({ sorted: true });

	return (
		<div className="flex flex-col flex-1 max-w-screen-xl mt-20 bg-black bg-opacity-40 rounded-md">
			<div className="flex flex-1 flex-col p-2.5 sm:p-5 mx-2 sm:mx-0">
				{songList.map((song) => {
					return (
						<Track
							key={"stream-all-" + song.key + song.title}
							song={song}
						/>
					);
				})}
			</div>
		</div>
	);
};

const Track = ({ song }: { song: Song }) => {
	const releaseDate = formatDistance(
		new Date(song.releasedDate),
		new Date(),
		{
			addSuffix: true,
		}
	);

	return (
		<Link
			className="shadow-2xl mb-5 bg-neutral-700 hover:bg-opacity-70 bg-opacity-50 rounded-xl"
			href={`streams/${song.key}`}
		>
			<div
				className="flex flex-col sm:flex-row w-full"
				key={song.key + song.title}
			>
				<div className="relative flex sm:hidden h-56">
					<Image
						className="absolute object-cover rounded-t-xl"
						fill={true}
						src={song.imgThumb}
						alt={`${song.title}'s album cover`}
						sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
					/>
				</div>

				<Image
					className="hidden sm:flex rounded-l-xl"
					src={song.imgThumb}
					alt={`${song.title}'s album cover`}
					width={200}
					height={200}
					sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
				/>

				<div className="flex flex-col w-full px-2 py-1.5 sm:py-0.5">
					<p className="text-lg font-bold">{song.title}</p>
					<p className="text-base opacity-80">{song.artist}</p>

					<div className="flex flex-col h-full justify-end text-xs opacity-80 mt-5">
						<div className="hidden sm:flex flex-row mb-2">
							{song.platforms.map((platform) => {
								return (
									<Image
										className="mr-1"
										key={
											"stream-all-" +
											song.key +
											song.title +
											platform.name
										}
										title={`On ${platform.name}`}
										alt={`${platform.imgUrl}'s logo`}
										src={platform.imgUrl}
										width={25}
										height={25}
									/>
								);
							})}
						</div>
						<span>{releaseDate}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Stream;
