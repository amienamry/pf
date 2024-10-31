import { toast } from 'react-hot-toast';
import { defaultMetaData } from './constants';
import { MetaDataType } from './types/MetaData';
import { GetServerSidePropsContext } from 'next';

export const fetchIf = (
	condition: boolean,
	input: string | URL | Request,
	cb: (json: any) => void,
	elseCb?: () => void
) => {
	if (condition) {
		fetch(input)
			.then((res) => res.json())
			.then((json) => cb(json))
			.catch((err) => {
				console.error(err);
				toast.error('Unable to fetch data', {
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff',
					},
				});
			});
	} else {
		elseCb();
	}
};

export const setupApiRequest = (
	path: string,
	params: { [key: string]: string }
): Request => {
	const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${path}`);

	url.search = params ? new URLSearchParams(params).toString() : '';

	return new Request(url.toString());
};

export const getMetaData = async (path: string): Promise<MetaDataType> => {
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
			cache: 'force-cache',
		});

		if (res.status < 200 || res.status >= 300) {
			throw new Error();
		}

		return (await res.json()) as MetaDataType;
	} catch (err) {
		console.error(`Couldn't fetch ${path}.`);
		return defaultMetaData;
	}
};

export const isMobile = (ctx?: GetServerSidePropsContext): boolean => {
	const userAgent = ctx?.req
		? ctx.req.headers['user-agent']
		: navigator.userAgent;

	return !!userAgent.match(
		/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
	);
};
