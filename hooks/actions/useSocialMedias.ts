import { addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { fetchIf, setupApiRequest } from '../../helpers';
import { SocialMediaData } from '../../types/data/SocialMediaData';

type ReturnType = {
	data: SocialMediaData[];
	getData: (params?: { [key: string]: string }, force?: boolean) => void;
};

let _lastFetched: Date | null = null;
let _data: ReturnType['data'] = [];

export const useSocialMedias = (): ReturnType => {
	const [data, setData] = useState<ReturnType['data']>([]);

	useEffect(() => {
		_data && setData(_data);
	}, []);

	const getData: ReturnType['getData'] = (params, force = false) => {
		const dataIsFresh =
			!force && _lastFetched && new Date() < addDays(_lastFetched, 1);

		const request = setupApiRequest('/social-medias', params);

		fetchIf(!dataIsFresh, request, (json) => {
			_lastFetched = new Date();
			_data = json;
			setData(_data);
		});
	};

	return { data, getData };
};
