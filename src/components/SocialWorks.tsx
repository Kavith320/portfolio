"use client";

import { motion } from "framer-motion";
import { Users, Heart, Handshake, Target } from "lucide-react";
import styles from "./SocialWorks.module.css";
import { useState } from "react";
import { useMappedData } from "@/hooks/usePortfolioData";
import Modal from "./Modal";

const SocialWorks = () => {
    const { data } = useMappedData();
    const socialWorksData = data.social || [];
    const [selectedWork, setSelectedWork] = useState<any | null>(null);

    return (
        <section id="social" className={styles.socialSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={styles.subtitle}
                    >
                        Giving Back
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={styles.title}
                    >
                        Social <span className="text-gradient">Impact</span>
                    </motion.h2>
                </div>

                <div className={styles.grid}>
                    {socialWorksData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`${styles.card} glass`}
                            onClick={() => setSelectedWork(item)}
                        >
                            <div className={styles.iconWrapper}>
                                {item.icon}
                            </div>
                            <h3 className={styles.workTitle}>{item.title}</h3>
                            <p className={styles.description}>{item.description}</p>
                            <div className={styles.impactBadge}>
                                <Target size={14} />
                                <span>{item.impact}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Modal isOpen={!!selectedWork} onClose={() => setSelectedWork(null)}>
                {selectedWork && (
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalIcon}>{selectedWork.icon}</div>
                            <h2 className={styles.modalTitle}>{selectedWork.title}</h2>
                        </div>

                        <div className={styles.impactGrid}>
                            <div className={styles.impactItem}>
                                <Target size={20} />
                                <div>
                                    <span className={styles.impactLabel}>Main Impact</span>
                                    <span className={styles.impactValue}>{selectedWork.impact}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modalBody}>
                            <p className={styles.modalDescription}>{selectedWork.longDescription}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </section>
    );
};

export default SocialWorks;
