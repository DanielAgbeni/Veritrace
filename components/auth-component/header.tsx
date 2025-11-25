import { icon } from '@/public/assets';
import Image from 'next/image';
import { memo } from 'react';

const AuthHeader = ({ title, image }: { title: string; image?: string }) => {
	return (
		<div className="flex flex-col items-center gap-3">
			<Image
				src={image || icon}
				alt="Veritrace"
			/>
			<h2 className="font-semibold text-2xl">Veritrace</h2>
			<h1>{title}</h1>
		</div>
	);
};

export default memo(AuthHeader);
