import { useEffect, useState } from "react";
import songList from "../mock/songList";

export const useSongList = ({ sorted }: { sorted?: boolean }) => {
	const [list, setList] = useState(songList);

	useEffect(() => {
		if (!sorted) return;

		const sortedList = [...songList].sort((a, b) => {
			return (
				new Date(b.releasedDate).valueOf() -
				new Date(a.releasedDate).valueOf()
			);
		});

		setList(sortedList);
	}, []);

	return {
		songList: list,
	};
};
