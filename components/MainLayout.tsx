import { MainLayoutType } from "../types/MainLayout";
import MetaTag from "./MetaTag";

const MainLayout = (props: MainLayoutType) => {
	return (
		<div className='pb-20'>
			<MetaTag {...props.metaData} />

			<main className='flex flex-1 justify-center'>
				<props.Content />
			</main>
		</div>
	);
};

export default MainLayout;
