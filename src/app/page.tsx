import AnnouncementBar from "@/components/AnnouncementBar";
import Architecture from "@/components/Architecture";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pipeline from "@/components/Pipeline";
import Specifications from "@/components/Specifications";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Pipeline />
        <Architecture />
        <Specifications />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
