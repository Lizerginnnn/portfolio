import { Footer, Header } from "@/components/layout";
import { Career, Hero, Projects, Skills } from "@/components/sections/home";
import { SECTION_IDS } from "@/utils";
import "./home-page.scss";

export function HomePage() {
  return (
    <div id={SECTION_IDS.top} className="home-page">
      <Header />
      <main className="home-page__main">
        <Hero />
        <Skills />
        <Projects />
        <Career />
      </main>
      <Footer />
    </div>
  );
}
