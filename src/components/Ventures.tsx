"use client";

import { motion } from "framer-motion";
import { Rocket, Calendar, ShieldCheck, ExternalLink } from "lucide-react";
import styles from "./Ventures.module.css";
import { useState } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import Modal from "./Modal";

const Ventures = () => {
    const { data } = usePortfolioData();
    const venturesData = data.ventures || [];
    const [selectedVenture, setSelectedVenture] = useState<any | null>(null);

    return (
        <section id="ventures" className={styles.venturesSection}>
            <div className={styles.header}>
                <h2 className={styles.subtitle}>Entrepreneurship</h2>
                <h3 className={styles.title}>Started <span className="text-gradient">& Scaled</span></h3>
            </div>

            <div className={styles.grid}>
                {venturesData.map((venture, index) => (
                    <motion.div
                        key={venture.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`${styles.venturesCard} glass`}
                        onClick={() => setSelectedVenture(venture)}
                    >
                        <div className={styles.ventureInfo}>
                            <h4>{venture.title}</h4>
                            <p>{venture.description}</p>
                            <div className={styles.ventureTags}>
                                <span>{venture.role}</span>
                                <span>{venture.status}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <Modal isOpen={!!selectedVenture} onClose={() => setSelectedVenture(null)}>
                {selectedVenture && (
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalBadge}>
                                <Rocket size={24} />
                                <span>Venture</span>
                            </div>
                            <h2 className={styles.modalTitle}>{selectedVenture.title}</h2>
                        </div>

                        <div className={styles.modalInfoGrid}>
                            <div className={styles.infoItem}>
                                <Calendar size={18} />
                                <span>{selectedVenture.year}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <ShieldCheck size={18} />
                                <span>Role: {selectedVenture.role}</span>
                            </div>
                        </div>

                        <div className={styles.modalBody}>
                            <p className={styles.modalDescription}>{selectedVenture.longDescription}</p>

                            <div className={styles.modalStats}>
                                <div className={styles.statLine}>
                                    <span className={styles.statLabel}>Status:</span>
                                    <span className={styles.statValue}>{selectedVenture.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
};

export default Ventures;
