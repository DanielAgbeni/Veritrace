import Cta from "@/components/home/Cta";
import Features from "@/components/home/features";
import Footer from "@/components/home/Footer";
import HeroComponent from "@/components/home/hero";

export default function Home() {
	return (
		<div>
		<HeroComponent />
		<Features />
		<Cta />
		<Footer />
		</div>
	);
}
