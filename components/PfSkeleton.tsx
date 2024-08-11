import Skeleton, { SkeletonProps } from 'react-loading-skeleton';

const PfSkeleton = ({ ...props }: SkeletonProps) => {
	return (
		<Skeleton
			baseColor='rgb(44,44,44)'
			highlightColor='rgb(99,99,99)'
			{...props}
		/>
	);
};

export default PfSkeleton;
