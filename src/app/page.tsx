import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-[#F5F3F3] overflow-hidden">
      <Navbar />
      <HeroSection />
    </main>
  );
}
