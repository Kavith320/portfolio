import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Ventures from "@/components/Ventures";
import SocialWorks from "@/components/SocialWorks";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Achievements />
        <Ventures />
        <SocialWorks />
        <Skills />

        <section id="contact" className={styles.contactSection}>
          <div className={`${styles.contactCard} glass`}>
            <h2 className={styles.title}>Let&apos;s build something <span className="text-gradient">together</span></h2>
            <p>I&apos;m always up for a chat about new ideas or collaborations. Just drop me a message!</p>
            <a href="mailto:hello@kavith.dev" className={styles.emailButton}>Say Hi!</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
