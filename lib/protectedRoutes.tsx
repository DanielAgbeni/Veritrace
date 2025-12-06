'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { useStore } from './useStore';

const protectRoute = <P extends object>(Component: React.ComponentType<P>) => {
	const ProtectedPage = (props: P) => {
		const { user, isHydrated } = useStore();
		const router = useRouter();
		const pathname = usePathname();

		useEffect(() => {
			if (!isHydrated) return;

			if (!user) {
				const redirect = encodeURIComponent(pathname || '/dashboard');
				router.push(`/auth/login?redirect=${redirect}`);
			}
		}, [user, isHydrated, pathname, router]);

		if (!isHydrated || !user) {
			return (
				<div className="w-screen h-screen flex items-center justify-center">
					<Spinner />
				</div>
			);
		}

		return <Component {...props} />;
	};

	return ProtectedPage;
};

export default protectRoute;