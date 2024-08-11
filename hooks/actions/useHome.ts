import { addMinutes } from 'date-fns';
import { useEffect, useState } from 'react';
import { fetchIf, setupApiRequest } from '../../helpers';
import { HomeData } from '../../types/data/HomeData';

type ReturnType = {
	data: HomeData | null;
	getData: (params?: { [key: string]: string }, force?: boolean) => void;
};

let _lastFetched: Date | null = null;
let _data: ReturnType['data'] = null;

export const useHome = (): ReturnType => {
	const [data, setData] = useState<ReturnType['data']>(null);

	useEffect(() => {
		_data && setData(_data);
	}, []);

	const getData: ReturnType['getData'] = (params, force = false) => {
		const dataIsFresh =
			!force && _lastFetched && new Date() < addMinutes(_lastFetched, 5);

		const request = setupApiRequest('/home', params);

		fetchIf(!dataIsFresh, request, (json) => {
			_lastFetched = new Date();
			_data = json;
			setData(_data);
		});
	};

	return { data, getData };
};
