"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

import { usePortfolioData } from "@/hooks/usePortfolioData";

const About = () => {
    const { data } = usePortfolioData();
    const aboutData = data.about;
    return (
        <section id="about" className={styles.about}>
            <div className={styles.container}>
                <div className={aboutData.image ? styles.grid : styles.content}>
                    {aboutData.image && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={styles.imageWrapper}
                        >
                            <img src={aboutData.image} alt="About" className={styles.aboutImage} />
                        </motion.div>
                    )}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={styles.textContent}
                    >
                        <h2 className={styles.subtitle}>{aboutData.subtitle}</h2>
                        <h3 className={styles.title}>{aboutData.title} <span className="text-gradient">{aboutData.titleGradient}</span></h3>
                        <p className={styles.description}>
                            {aboutData.description}
                        </p>
                        <div className={styles.stats}>
                            {aboutData.stats.map((stat: any, i: number) => (
                                <div key={i} className={styles.statItem}>
                                    <span className={styles.statNumber}>{stat.number}</span>
                                    <span className={styles.statLabel}>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
