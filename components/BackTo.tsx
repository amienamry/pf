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
			className='z-[3] flex flex-row items-center sticky text-white text-sm bottom-3 ml-3 w-fit rounded-full bg-neutral-700 py-1.5 px-2.5'
			style={{
				boxShadow: '5px 0px 10px -5px rgba(0,0,0,0.75)',
			}}
		>
			<FaArrowLeft className='mr-1.5' />
			Back to {config.name}
		</button>
	);
};

export default BackTo;
