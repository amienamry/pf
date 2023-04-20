import { useEffect, useState } from "react";

export const useImagePreview = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
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
		setIsOpen(true);
		setPath(path);
		document.body.style.overflow = "hidden";
	};

	const closePreview = () => {
		setIsLoading(false);
		setIsOpen(false);
		setPath(null);
		document.body.style.overflow = "auto";
	};

	const loadComplete = () => {
		setIsLoading(false);
	};

	return {
		path,
		isOpen,
		isLoading,
		openPreview,
		closePreview,
		loadComplete,
	};
};
