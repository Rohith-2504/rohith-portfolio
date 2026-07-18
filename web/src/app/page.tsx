import AmbientBackground from "@/components/layout/AmbientBackground";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SideNav from "@/components/layout/SideNav";
import AboutExperienceSection from "@/components/sections/AboutExperienceSection";
import DashboardSection from "@/components/sections/DashboardSection";
import ContactSection from "@/components/sections/ContactSection";
import Hero from "@/components/sections/Hero";
import ProjectsSection from "@/components/sections/ProjectsSection";
import StatsSection from "@/components/sections/StatsSection";

export default function HomePage() {
  return (
    <div className="relative lg:pl-16">
      <AmbientBackground />
      <ScrollProgress />
      <SideNav />
      <Navbar />
      <Hero />
      <StatsSection />
      <AboutExperienceSection />
      <ProjectsSection />
      <DashboardSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
