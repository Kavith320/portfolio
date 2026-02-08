"use client";

import { motion } from "framer-motion";
import styles from "./Skills.module.css";
import { useMappedData } from "@/hooks/usePortfolioData";

const Skills = () => {
    const { data } = useMappedData();
    const skillsData = data.skills || [];
    return (
        <section id="skills" className={styles.skillsSection}>
            <div className={styles.header}>
                <h2 className={styles.subtitle}>My Tools</h2>
                <h3 className={styles.title}>What I&apos;m <span className="text-gradient">Good At</span></h3>
            </div>

            <div className={styles.skillsGrid}>
                {skillsData.map((skill: any, index: number) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`${styles.skillCard} glass`}
                    >
                        <div className={styles.skillIcon}>
                            {skill.icon}
                        </div>
                        <h4>{skill.name}</h4>
                        <div className={styles.skillItems}>
                            {skill.items.map((item: string) => (
                                <span key={item} className={styles.skillTag}>{item}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
