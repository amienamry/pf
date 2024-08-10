export const fetchIf = (
	condition: boolean,
	url: string,
	cb: (json: any) => void
) => {
	if (condition) {
		fetch(url)
			.then((res) => res.json())
			.then((json) => cb(json));
	}
};
