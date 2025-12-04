'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { useStore } from './useStore';


const protectRoute = <P extends object>(Component: React.ComponentType<P>) => {
	const ProtectedPage = (props: P) => {
		const { user, hydrate } = useStore();
		const router = useRouter();
		const pathname = usePathname();
		const [checkingAuth, setCheckingAuth] = useState(true);

		// Ensure store is hydrated (in case AuthHydrator hasn't yet)
		useEffect(() => {
			hydrate();
		}, [hydrate]);

		useEffect(() => {
			// Once we know auth state, redirect if not logged in
			if (!user) {
				const redirect = encodeURIComponent(pathname || '/');
				router.push(`/login?redirect=${redirect}`);
			} else {
				setCheckingAuth(false);
			}
		}, [user, pathname, router]);

		// While checking or redirecting, show a simple full-screen loader
		if (!user || checkingAuth) {
			return (
				<div className="w-screen h-screen flex items-center justify-center">
					<span className="text-white/80 text-sm">
						<Spinner/>
					</span>
				</div>
			);
		}

		return <Component {...props} />;
	};

	return ProtectedPage;
};

export default protectRoute;
