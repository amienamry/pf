import { EducationData } from '../../types/data/EducationData';
import { _useAction } from './_useAction';

type ReturnType = {
	data: EducationData[] | null;
	getData: (params?: { [key: string]: string }, force?: boolean) => void;
};

export const useEducationApi = (): ReturnType => {
	const { data, actionGet } = _useAction<ReturnType['data']>({
		path: '/educations',
		defaultState: [],
	});

	const getData: ReturnType['getData'] = (params, force = false) => {
		actionGet(params, force);
	};

	return { data, getData };
};
