import { MetaDataType } from "../../types/MetaData";
import MainLayout from "../../components/MainLayout";
import { useRouter } from "next/router";
import redirect from "nextjs-redirect";
import songs from "../../mock/songList";

const Song = () => {
	const router = useRouter();

	const song = songs.find((sm) => sm.key === router.query.song);

	if (!song) {
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
		title: `Arai Junior | ${song?.title}`,
		description: song?.description,
		image_url: song?.img_url,
		path: `https://amienamry.dev/streams/${song?.key}`,
	};

	const Redirect = redirect(song?.path);

	return (
		<Redirect>
			<MainLayout
				metaData={metaData}
				Content={() => <Content message={song?.title} />}
			/>
		</Redirect>
	);
};

const Content = ({ message }) => {
	return <h1 className='text-black text-2xl'>{message}</h1>;
};

Song.getInitialProps = async () => {
	return {};
};

export default Song;
