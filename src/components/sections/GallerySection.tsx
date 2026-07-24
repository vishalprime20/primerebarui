import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GallerySection() {
  return (
    <section id="gallery" className="relative z-10 scroll-mt-24 section-pad">
      <div className="container-site">
        <SectionHeading
          eyebrow="Gallery"
          title="Fabrication & project atmosphere"
          description="A look at the industrial context of the work we support every day."
        />
        <div className="mt-12">
          <GalleryGrid />
        </div>
      </div>
    </section>
  );
}
