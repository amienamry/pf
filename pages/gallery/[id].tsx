import { useRouter } from "next/router";
import { useEffect } from "react";
import { ImagePreview } from "../../components/ImagePreview";
import MainLayout from "../../components/MainLayout";
import { useImagePreview } from "../../hooks/useImagePreview";
import { images } from "../../mock/images";
import { MetaDataType } from "../../types/MetaData";
import { PfImage } from "../../types/PfImage";
import redirect from "nextjs-redirect";

const LoadingPage = () => (
	<div className="w-screen h-screen bg-black absolute top-0 left-0 z-50 flex justify-center items-center">
		<img className="w-16 h-16 z-50" src="/images/loader.svg" />
	</div>
);

const Preview = () => {
	const router = useRouter();

	const { id } = router.query;

	const img = images.find((img) => img.id === id);

	if (!img) {
		const Redirect = redirect("https://amienamry.dev/gallery");
		return (
			<Redirect>
				<LoadingPage />
			</Redirect>
		);
	}

	const metaData: MetaDataType = {
		title: `Amien Amry | Gallery${img.title ? ": " + img.title : ""}`,
		description: `${img.title ?? ""}${
			img.description ? " - " + img.description : ""
		}`,
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

export const getServerSideProps = (context) => {
	return {
		props: { params: context.params },
	};
};

export default Preview;
