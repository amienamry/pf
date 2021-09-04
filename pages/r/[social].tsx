import { MetaDataType } from "../../types/MetaData";
import MainLayout from "../../components/MainLayout";
import { useRouter } from "next/router";
import redirect from "nextjs-redirect";
import socialMedias from "../../mock/socialMediaList";

const Links = () => {
	const router = useRouter();

	const socialMedia = socialMedias.find(
		(sm) => sm.key === router.query.social
	);

	if (!socialMedia) {
		const Redirect = redirect("https://amienamry.dev");
		const message = ["x"].reduce((acc, msg) => {
			for (let i = 0; i < 10; i++) {
				for (let j = 0; j < 200; j++) {
					acc += msg;
				}
				acc += "\n";
			}

			return acc;
		}, "x");

		return (
			<Redirect>
				<Content message={message} />
			</Redirect>
		);
	}

	const metaData: MetaDataType = {
		title: `Amien Amry | ${socialMedia?.title}`,
		description: `To my ${socialMedia?.title}!`,
		image_url: "https://amienamry.dev/images/logo/logo.png",
		path: `https://amienamry.dev/r/${socialMedia?.key}`,
	};

	const Redirect = redirect(socialMedia?.path);

	return (
		<Redirect>
			<MainLayout
				metaData={metaData}
				Content={() => (
					<Content
						message={`Redirecting to ${socialMedia?.title}...`}
					/>
				)}
			/>
		</Redirect>
	);
};

const Content = ({ message }) => {
	return <h1 className='text-black text-2xl'>{message}</h1>;
};

Links.getInitialProps = async () => {
	return {};
};

export default Links;
