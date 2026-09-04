import { Hero } from "@/components/hero";
import { EvidenceStrip } from "@/components/evidence-strip";
import { Work } from "@/components/work";
import { Approach } from "@/components/approach";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { PhasingBackground } from "@/components/phasing-background";

export default function Page() {
  return (
    <main className="relative">
      <PhasingBackground />
      <Hero />
      <EvidenceStrip />
      <Work />
      <Approach />
      <About />
      <Contact />
    </main>
  );
}
