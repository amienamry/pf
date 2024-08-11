import { addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import { fetchIf } from '../../helpers';
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

		const url = new URL(`${API_URL}/social-medias`);

		url.search = params ? new URLSearchParams(params).toString() : '';

		const request = new Request(url.toString());

		fetchIf(!dataIsFresh, request, (json) => {
			_lastFetched = new Date();
			_data = json;
			setData(_data);
		});
	};

	return { data, getData };
};
