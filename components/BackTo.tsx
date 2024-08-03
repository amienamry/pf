import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { BackToButtonConfig } from '../types/BackToButtonConfig';

const BackTo = ({
	backToButtonConfig: config,
}: {
	backToButtonConfig?: BackToButtonConfig;
}) => {
	if (!config?.show || !config?.path || !config?.name) {
		return null;
	}

	const router = useRouter();

	return (
		<button
			onClick={() => router.push(config.path)}
			className='flex flex-row items-center sticky border border-white text-white bottom-3 ml-3 w-fit rounded-full bg-black py-2 px-3'
		>
			<FaArrowLeft className='mr-1.5' />
			Back to {config.name}
		</button>
	);
};

export default BackTo;
