import { useEffect, useState } from "react";
import songList from "../mock/songList";

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
		if (!q) {
			sorted ? sortList() : setList(IMMUTABLE_LIST);
			return true;
		}

		const queryChunk = q.split(" ").filter(Boolean);

		const filtered = IMMUTABLE_LIST.filter((song) => {
			return queryChunk.some((q) => {
				return (
					song.title.toLowerCase().includes(q) ||
					song.artist.toLowerCase().includes(q) ||
					song.genre.toLowerCase().includes(q)
				);
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
