import Navbar from '@/components/general/Navbar';
import Cta from '@/components/home/Cta';
import Features from '@/components/home/features';
import Footer from '@/components/home/Footer';
import HeroComponent from '@/components/home/hero';

export default function Home() {
	return (
		<div>
			<Navbar />
			<HeroComponent />
			<Features />
			<Cta />
			<Footer />
		</div>
	);
}
