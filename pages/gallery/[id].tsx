import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import { useImagePreview } from '../../hooks/useImagePreview';
import { images } from '../../mock/images';
import { MetaDataType } from '../../types/MetaData';
import { PfImage } from '../../types/PfImage';
import redirect from 'nextjs-redirect';
import { format } from 'date-fns';
import ImagePreview from '../../components/ImagePreview';

const LoadingPage = () => (
	<div className='w-screen h-screen bg-black absolute top-0 left-0 z-50 flex justify-center items-center'>
		<img className='w-16 h-16 z-50' src='/images/loader.svg' />
	</div>
);

const Preview = () => {
	const router = useRouter();

	const { id } = router.query;

	const img = images.find((img) => img.id === id);

	if (!img) {
		const Redirect = redirect('https://amienamry.dev/gallery');
		return (
			<Redirect>
				<LoadingPage />
			</Redirect>
		);
	}

	const defaultText = 'Amien Amry | Gallery';

	const makeTitle = (): string => {
		let result = '';

		if (img.title) {
			result =
				img.title.charAt(0).toUpperCase() + String(img.title).slice(1);
		}

		if (img.description && img.title !== img.description) {
			result = `${result} - ${img.description}`;
		}

		if (img.location) {
			result = `${result} at ${img.location}`;
		}

		if (result.length < 40) {
			result = `${result} - ${defaultText}`;
		}

		return result;
	};

	const makeDescription = (): string => {
		const date = format(img.createdAt, 'd MMM yyyy');

		return `${defaultText} - ${date}, Never gonna give you up, Never gonna let you down, Never gonna run around and desert you, Never gonna make you cry, Never gonna say goodbye, Never gonna tell a lie and hurt you`;
	};

	const metaData: MetaDataType = {
		title: makeTitle(),
		description: makeDescription(),
		image_url: `https://amienamry.dev${img.path}`,
		path: `https://amienamry.dev/gallery/${img.id}`,
	};

	return (
		<MainLayout
			metaData={metaData}
			Content={() => <Content image={img} />}
		/>
	);
};

const Content = ({ image }: { image: PfImage }) => {
	const { path, isLoading, openPreview, closePreview, loadComplete } =
		useImagePreview();

	useEffect(() => {
		openPreview(image);
	}, []);

	return (
		<ImagePreview
			image={image}
			path={path}
			isLoading={isLoading}
			closePreview={closePreview}
			loadComplete={loadComplete}
		/>
	);
};

export const getServerSideProps = () => {
	return {
		props: {
			backToButtonConfig: {
				show: true,
				path: '/gallery',
				name: 'Gallery',
			},
		},
	};
};

export default Preview;
