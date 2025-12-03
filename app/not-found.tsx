import Link from 'next/link';
import Navbar from '@/components/general/Navbar';
import MainContainer from '@/components/general/maincontainer';

export default function NotFound() {
	return (
		<>
			<Navbar />
			<MainContainer className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
				<div className="space-y-2">
					<h1 className="text-5xl font-extrabold tracking-tight text-gray-900">
						404
					</h1>
					<p className="text-xl font-semibold text-gray-800">
						Page not found
					</p>
					<p className="text-sm text-gray-500 max-w-md">
						The page you&apos;re looking for doesn&apos;t exist or has been moved.
					</p>
				</div>

				<div className="flex flex-wrap items-center justify-center gap-3">
					<Link
						href="/"
						className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
						Go to homepage
					</Link>
					<Link
						href="/dashboard"
						className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
						Go to dashboard
					</Link>
				</div>
			</MainContainer>
		</>
	);
}


