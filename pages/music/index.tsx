import MainLayout from '../../components/MainLayout';
import { useSongList } from '../../hooks/useSongList';
import { MetaDataType } from '../../types/MetaData';
import { BiSearch } from 'react-icons/bi';
import Card from '../../components/Card';

const Stream = () => {
	const metaData: MetaDataType = {
		title: `Amien Amry | Arai Junior - Composer and Producer`,
		description:
			'Explore my music and enjoy streaming my latest track. Discover my unique sound and creative style in EDM, instrumental, and experimental genres.',
		image_url: 'https://amienamry.dev/images/logo/music.png',
		path: 'https://amienamry.dev/music',
	};

	return <MainLayout metaData={metaData} Content={() => <Content />} />;
};

const Content = () => {
	const { songList, search } = useSongList({ sorted: true });

	return (
		<div className='relative flex flex-col flex-1 max-w-screen-lg mt-20 bg-black bg-opacity-40 rounded-md'>
			<div className='flex flex-1 px-2.5 sm:px-5 mx-2 sm:mx-0 mt-6 mb-6 sm:mb-3'>
				<input
					onChange={(e) => search(e.target.value)}
					className='w-full bg-neutral-600 h-10 rounded-lg pl-2 pr-8'
					type='text'
					placeholder='Search by song title, artist name, or genre'
				/>
				<BiSearch className='absolute h-6 w-6 right-6 top-8' />
			</div>

			<div className='flex flex-1 flex-col p-2.5 sm:p-5 mx-2 sm:mx-0'>
				{!songList.length ? (
					<div className='min-h-[50vh] flex flex-col items-center w-full text-center text-lg py-12'>
						No results found 😿
					</div>
				) : (
					songList.map((song) => {
						return (
							<Card
								key={'stream-all-' + song.key + song.title}
								data={{
									id: song.key,
									href: `music/${song.key}`,
									title: song.title,
									description: song.artist,
									date: new Date(song.releasedDate),
									tag: song.genre,
									imgThumb: song.imgThumb,
									imgAltText: `${song.title}'s album cover`,
									verified: song.verified,
									icons: song.platforms,
								}}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Stream;
