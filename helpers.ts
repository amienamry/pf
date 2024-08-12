import { toast } from 'react-hot-toast';

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
				toast.error('Unable to fetch data');
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
