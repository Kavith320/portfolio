"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Zap, Code, Layout, Calendar } from "lucide-react";
import styles from "./Projects.module.css";
import Image from "next/image";
import { useState } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import Modal from "./Modal";

const Projects = () => {
    const { data } = usePortfolioData();
    const projectsData = data.projects;
    const [selectedProject, setSelectedProject] = useState<any | null>(null);

    return (
        <section id="projects" className={styles.projects}>
            <div className={styles.header}>
                <h2 className={styles.subtitle}>{data.headings?.projects?.title || "Recent Work"}</h2>
                <h3 className={styles.title}>
                    {data.headings?.projects?.subtitle?.split(' ').map((word: string, i: number, arr: string[]) => (
                        i === arr.length - 1 ? <span key={i} className="text-gradient">{word}</span> : word + ' '
                    )) || "Stuff I've Built"}
                </h3>
            </div>

            <div className={styles.grid}>
                {projectsData.map((project: any, index: number) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`${styles.card} glass`}
                        onClick={() => setSelectedProject(project)}
                    >
                        <div className={styles.imageContainer}>
                            {project.image ? (
                                <Image src={project.image} alt={project.title} fill className={styles.image} />
                            ) : (
                                <div className={styles.placeholderImage} />
                            )}
                        </div>
                        <div className={styles.info}>
                            <div className={styles.tags}>
                                {project.tags.map((tag: string) => <span key={tag} className={styles.tag}>{tag}</span>)}
                            </div>
                            <h4 className={styles.projectTitle}>{project.title}</h4>
                            <p className={styles.projectDesc}>{project.description}</p>
                            <div className={styles.links}>
                                <a
                                    href={project.github}
                                    className={styles.iconLink}
                                    aria-label="Github"
                                    onClick={(e) => e.stopPropagation()}
                                ><Github size={20} /></a>
                                <a
                                    href={project.link}
                                    className={styles.iconLink}
                                    aria-label="Live Demo"
                                    onClick={(e) => e.stopPropagation()}
                                ><ExternalLink size={20} /></a>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
                {selectedProject && (
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{selectedProject.title}</h2>
                            <div className={styles.modalTags}>
                                {selectedProject.tags.map((tag: string) => (
                                    <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>

                        {selectedProject.image && (
                            <div className={styles.modalImageWrapper}>
                                <img src={selectedProject.image} alt={selectedProject.title} className={styles.modalImage} />
                            </div>
                        )}

                        <div className={styles.modalBody}>
                            <div className={styles.modalInfoGrid}>
                                <div className={styles.infoItem}>
                                    <Code size={18} />
                                    <span>Tech Stack</span>
                                </div>
                                <div className={styles.infoItem}>
                                    <Layout size={18} />
                                    <span>Scale: Production Ready</span>
                                </div>
                            </div>

                            <p className={styles.modalDescription}>{selectedProject.longDescription}</p>

                            <div className={styles.modalActions}>
                                <a href={selectedProject.github} className={styles.primaryButton}>
                                    <Github size={20} /> View Github
                                </a>
                                <a href={selectedProject.link} className={styles.secondaryButton}>
                                    <ExternalLink size={20} /> Live Demo
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
};

export default Projects;
