'use client';

import { useIconMapper } from '../hooks/useIconMapper';

const PfIcon = ({ name, className }: { name: string; className: string }) => {
	const Icon = useIconMapper(name);
	return <Icon className={className} />;
};

export default PfIcon;
