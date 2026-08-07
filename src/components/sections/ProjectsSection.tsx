import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 scroll-mt-20 section-pad bg-ink/50">
      <div className="container-site">
        <SectionHeading
          eyebrow="Projects"
          title="Work across NY & NJ"
          description="Airports, bridges, and urban builds — reinforcing steel delivered where it counts."
        />
        <Reveal className="mt-12">
          <ProjectGrid />
        </Reveal>
      </div>
    </section>
  );
}
