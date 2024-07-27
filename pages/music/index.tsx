import MainLayout from "../../components/MainLayout";
import { useSongList } from "../../hooks/useSongList";
import { MetaDataType } from "../../types/MetaData";
import { Song, StreamingPlatform } from "../../types/Song";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";
import { BiSearch } from "react-icons/bi";
import { MdVerified } from "react-icons/md";

const Stream = () => {
	const metaData: MetaDataType = {
		title: `Amien Amry | Arai Junior - Composer and Producer`,
		description:
			"Explore my music and enjoy streaming my latest track. Discover my unique sound and creative style in EDM, instrumental, and experimental genres.",
		image_url: "https://amienamry.dev/images/logo/music.png",
		path: "https://amienamry.dev/music",
	};

	return <MainLayout metaData={metaData} Content={() => <Content />} />;
};

const Content = () => {
	const { songList, search } = useSongList({ sorted: true });

	return (
		<div className="relative flex flex-col flex-1 max-w-screen-lg mt-20 bg-black bg-opacity-40 rounded-md">
			<div className="flex flex-1 px-2.5 sm:px-5 mx-2 sm:mx-0 mt-6 mb-3">
				<input
					onChange={(e) => search(e.target.value)}
					className="w-full bg-neutral-600 h-10 rounded-lg pl-2 pr-8"
					type="text"
					placeholder="Search by song title, artist name, or genre"
				/>
				<BiSearch className="absolute h-6 w-6 right-6 top-8" />
			</div>

			<div className="flex flex-1 flex-col p-2.5 sm:p-5 mx-2 sm:mx-0">
				{!songList.length ? (
					<div className="min-h-[50vh] flex flex-col items-center w-full text-center text-lg py-12">
						No results found 😿
					</div>
				) : (
					songList.map((song) => {
						return (
							<Track
								key={"stream-all-" + song.key + song.title}
								song={song}
							/>
						);
					})
				)}
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

	const handlePlatformClick = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>,
		platform: StreamingPlatform
	) => {
		e.preventDefault();
		window.open(platform.url, "_blank");
	};

	return (
		<Link
			className="relative shadow-2xl mb-5 bg-neutral-700 hover:bg-opacity-70 bg-opacity-50 rounded-xl"
			href={`music/${song.key}`}
		>
			<div className="absolute top-2 left-2 sm:hidden z-[1] text-sm bg-black py-0.5 px-1.5 rounded bg-opacity-40">
				{song.genre}
			</div>

			<div className="flex flex-col sm:flex-row w-full">
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
					width={150}
					height={150}
					sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
				/>

				<div className="flex flex-col w-full px-2 py-1.5 sm:py-0.5">
					<p className="text-lg font-bold w-fit hover:underline">
						{song.title}
						{song.verified && (
							<MdVerified
								title="Verified and officially released."
								className="ml-1 align-text-top inline-flex text-blue-400"
							/>
						)}

						<div className="text-sm font-normal ml-2 hidden sm:inline-block bg-black py-0.5 px-1.5 rounded bg-opacity-20 text-gray-400">
							{song.genre}
						</div>
					</p>
					<p className="text-base opacity-80">{song.artist}</p>

					<div className="flex flex-col h-full justify-end text-xs opacity-80 mt-5">
						<div className="hidden sm:flex flex-row mb-2">
							{song.platforms.map((platform) => {
								return (
									<Image
										onClick={(e) =>
											handlePlatformClick(e, platform)
										}
										className="mr-1 hover:opacity-90"
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
