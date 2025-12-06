'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/useStore';

export default function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	useEffect(() => {
		useStore.getState().hydrate();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
