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
