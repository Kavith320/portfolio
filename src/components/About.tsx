"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import styles from "./About.module.css";

import { usePortfolioData } from "@/hooks/usePortfolioData";

const Counter = ({ value }: { value: string }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [displayValue, setDisplayValue] = useState("0");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Parse the number and suffix (e.g., "10+" -> number: 10, suffix: "+")
    const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
    const suffix = value.replace(/[0-9]/g, "");

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, numericValue, {
                duration: 2,
                ease: "easeOut",
            });
            return controls.stop;
        }
    }, [isInView, numericValue, count]);

    useEffect(() => {
        return rounded.on("change", (latest) => {
            setDisplayValue(latest.toLocaleString() + suffix);
        });
    }, [rounded, suffix]);

    return <span ref={ref}>{displayValue}</span>;
};

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
                                    <span className={styles.statNumber}>
                                        <Counter value={stat.number} />
                                    </span>
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
