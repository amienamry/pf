export const fetchIf = (
	condition: boolean,
	input: string | URL | Request,
	cb: (json: any) => void
) => {
	if (condition) {
		fetch(input)
			.then((res) => res.json())
			.then((json) => cb(json));
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
