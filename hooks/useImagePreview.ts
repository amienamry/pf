import { useRouter } from 'next/router';
import { useState } from 'react';
import { PfImage } from '../types/PfImage';

let globalImage = null;

export const useImagePreview = () => {
	const router = useRouter();
	const [path, setPath] = useState<null | string>(null);
	const [, setImage] = useState<null | PfImage>(null);
	const [isLoading, setIsLoading] = useState(true);

	const _open = (_image: PfImage) => {
		globalImage = _image;

		setIsLoading(true);
		setPath(globalImage.path);
		setImage(globalImage);
	};

	const _close = () => {
		setIsLoading(false);
		setPath(null);
		setImage(null);
	};

	const openPreview = (_image?: PfImage) => {
		if (!_image?.path) {
			throw new Error('Path is empty, please provide a valid path');
		}

		_open(_image);
	};

	const closePreview = () => {
		const cannotGoBack = window.history.state.url.includes(globalImage.id);

		_close();

		cannotGoBack
			? router.push('/gallery', undefined, { scroll: true })
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
