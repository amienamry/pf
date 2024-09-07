import { useEffect, useState } from 'react';
import songList from '../mock/songList';
import { Song } from '../types/Song';

const IMMUTABLE_LIST = Object.freeze(structuredClone(songList));

export const useSongList = ({ sorted }: { sorted?: boolean }) => {
	const [list, setList] = useState(IMMUTABLE_LIST);

	useEffect(() => {
		sorted && sortList();
	}, []);

	const sortList = () => {
		const sortedList = structuredClone(songList).sort((a, b) => {
			return (
				new Date(b.releasedDate).valueOf() -
				new Date(a.releasedDate).valueOf()
			);
		});

		setList(sortedList);
	};

	const search = (q: string): boolean => {
		q = q.trim();

		if (!q) {
			sorted ? sortList() : setList(IMMUTABLE_LIST);
			return true;
		}

		const queryChunk = q.split(' ').filter(Boolean);

		const filter = (song: Song, queryString: string) => {
			return (
				song.title.toLowerCase().includes(queryString) ||
				song.artist.toLowerCase().includes(queryString) ||
				song.genre.toLowerCase().includes(queryString)
			);
		};

		const filtered = IMMUTABLE_LIST.filter((song) => {
			return queryChunk.length > 1
				? filter(song, q)
				: queryChunk.some((oneOfQuery) => {
						return filter(song, oneOfQuery);
				  });
		});

		setList(filtered);

		return true;
	};

	return {
		songList: list,
		search,
		sortList,
	};
};
