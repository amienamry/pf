import { useRouter } from "next/router";
import { images } from "../../mock/images";
import redirect from "nextjs-redirect";
import { MetaDataType } from "../../types/MetaData";
import MainLayout from "../../components/MainLayout";

const LoadingPage = () => (
	<div className="w-screen h-screen bg-black absolute top-0 left-0 z-50 flex justify-center items-center">
		<img className="w-16 h-16 z-50" src="/images/loader.svg" />
	</div>
);

const ShortenedUrl = () => {
	const router = useRouter();

	const { id } = router.query;

	const img = images.find((img) => img.shortId === id);

	if (!img) {
		const Redirect = redirect("https://amienamry.dev/gallery");
		return (
			<Redirect>
				<LoadingPage />
			</Redirect>
		);
	}

	const metaData: MetaDataType = {
		title: `Amien Amry | Gallery${img.title ? " • " + img.title : ""}`,
		description: `${img.title ?? ""}${
			img.description ? " - " + img.description : ""
		}`,
		image_url: `https://amienamry.dev${img.path}`,
		path: `https://amienamry.dev/gallery/${img.id}`,
	};

	const Redirect = redirect(metaData.path);

	return (
		<MainLayout
			metaData={metaData}
			Content={() => (
				<Redirect>
					<LoadingPage />
				</Redirect>
			)}
		/>
	);
};

export default ShortenedUrl;
