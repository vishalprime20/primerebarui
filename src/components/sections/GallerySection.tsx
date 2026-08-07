import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GallerySection() {
  return (
    <section id="gallery" className="relative z-10 scroll-mt-20 section-pad">
      <div className="container-site">
        <SectionHeading
          eyebrow="Gallery"
          title="Shop floor & project photos"
          description="Real fabrication and jobsite imagery from Prime Rebar — the same asset library used on primerebar.com."
        />
        <div className="mt-12">
          <GalleryGrid />
        </div>
      </div>
    </section>
  );
}
