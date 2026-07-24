import { ProductTabs } from "@/components/products/ProductTabs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProductsSection() {
  return (
    <section id="products" className="relative z-10 scroll-mt-24 section-pad">
      <div className="container-site">
        <SectionHeading
          eyebrow="Products"
          title="Steel, supports & assemblies"
          description="Reinforcing steel, bar supports, assemblies, couplers, and mesh — fabricated to spec."
        />
        <Reveal className="mt-12">
          <ProductTabs />
        </Reveal>
      </div>
    </section>
  );
}
