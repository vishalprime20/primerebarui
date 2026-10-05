import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { FabricationReel } from "@/components/home/FabricationReel";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionDivider } from "@/components/motion/SectionDivider";
import { FloatingOrbs } from "@/components/motion/FloatingOrbs";
import { PageProgress } from "@/components/motion/PageProgress";

export default function HomePage() {
  return (
    <div className="relative">
      <PageProgress />
      <FloatingOrbs />
      <div className="relative z-10">
        <Hero />
        <TrustStrip />
        <FabricationReel />
        <AboutSection />
        <SectionDivider />
        <ServicesSection />
        <SectionDivider />
        <ProductsSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <GallerySection />
        <SectionDivider />
        <ToolsSection />
        <SectionDivider />
        <ContactSection />
      </div>
    </div>
  );
}
