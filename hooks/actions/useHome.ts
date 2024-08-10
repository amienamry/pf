import { addMinutes } from 'date-fns';
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import { fetchIf } from '../../helpers';
import { HomeData } from '../../types/data/HomeData';

type ReturnType = {
	data: HomeData | null;
	getData: (force?: boolean) => void;
};

let _lastFetched: Date | null = null;
let _data: HomeData | null = null;

export const useHome = (): ReturnType => {
	const [data, setData] = useState<HomeData | null>(null);

	useEffect(() => {
		_data && setData(_data);
	}, []);

	const getData = (force = false) => {
		const dataIsFresh =
			!force && _lastFetched && new Date() < addMinutes(_lastFetched, 5);

		fetchIf(!dataIsFresh, `${API_URL}/home`, (json) => {
			_lastFetched = new Date();
			_data = json;
			setData(_data);
		});
	};

	return { data, getData };
};
