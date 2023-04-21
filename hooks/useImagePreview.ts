import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useImagePreview = () => {
	const router = useRouter();
	const [path, setPath] = useState<null | string>(null);
	const [isLoading, setIsLoading] = useState(true);

	const handleEscKey = (event: KeyboardEvent) => {
		event.key === "Escape" && closePreview();
	};

	useEffect(() => {
		document.addEventListener("keydown", handleEscKey);
		return () => document.removeEventListener("keydown", handleEscKey);
	}, []);

	const openPreview = (path: string) => {
		if (!path) {
			throw new Error("Path is empty, please provide a valid path");
		}
		setIsLoading(true);
		setPath(path);
	};

	const closePreview = () => {
		setIsLoading(false);
		setPath(null);

		window.history.state.options?.shallow
			? router.push("/gallery", undefined, { scroll: true })
			: router.back();
	};

	const loadComplete = () => {
		setIsLoading(false);
	};

	return {
		path,
		isLoading,
		openPreview,
		closePreview,
		loadComplete,
	};
};
