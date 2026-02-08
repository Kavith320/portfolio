"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import styles from "./Hero.module.css";

import { usePortfolioData } from "@/hooks/usePortfolioData";

const Hero = () => {
    const { data } = usePortfolioData();
    const heroData = data.hero;
    return (
        <section className={styles.hero} id="home">
            <div className={styles.content}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className={`${styles.badge} glass`}>{heroData.badge}</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    className={styles.title}
                >
                    {heroData.firstName} <span className="text-gradient">{heroData.lastName}</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={styles.description}
                >
                    {heroData.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className={styles.tags}
                >
                    {heroData.tags.map((tag, i) => (
                        <span key={i} className={styles.tag}>{tag}</span>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className={styles.actions}
                >
                    <a href="#projects" className={styles.primaryButton}>
                        Explore Work <ArrowRight size={18} />
                    </a>
                    <div className={styles.socials}>
                        <a href="#" className={styles.socialLink} aria-label="LinkedIn"><Linkedin size={22} /></a>
                        <a href="#" className={styles.socialLink} aria-label="GitHub"><Github size={22} /></a>
                        <a href="#" className={styles.socialLink} aria-label="Email"><Mail size={22} /></a>
                    </div>
                </motion.div>
            </div>

            <div className={styles.visualContainer}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
                    className={styles.visual}
                >
                    <div className={styles.glowCircle} />
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/me1.jpeg"
                            alt="Kavith Udapola"
                            width={400}
                            height={500}
                            className={styles.profileImage}
                            priority
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
