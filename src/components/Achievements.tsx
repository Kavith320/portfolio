"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Zap, Star, Calendar, MapPin } from "lucide-react";
import styles from "./Achievements.module.css";
import { useState } from "react";
import { useMappedData } from "@/hooks/usePortfolioData";
import Modal from "./Modal";

const Achievements = () => {
    const { data } = useMappedData();
    const achievementsData = data.achievements || [];
    const [selectedAchievement, setSelectedAchievement] = useState<any | null>(null);

    return (
        <section id="achievements" className={styles.achievements}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={styles.subtitle}
                    >
                        Success Stories
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={styles.title}
                    >
                        Key <span className="text-gradient">Achievements</span>
                    </motion.h2>
                </div>

                <div className={styles.grid}>
                    {achievementsData.map((item: any, index: number) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`${styles.card} glass`}
                            onClick={() => setSelectedAchievement(item)}
                        >
                            {item.image && (
                                <div className={styles.cardImageWrapper}>
                                    <img src={item.image} alt={item.title} className={styles.cardImage} />
                                </div>
                            )}
                            <div className={styles.cardContent}>
                                <span className={styles.year}>{item.year}</span>
                                <div className={styles.iconWrapper}>
                                    {item.icon}
                                </div>
                                <h3 className={styles.achievementTitle}>{item.title}</h3>
                                <p className={styles.description}>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Modal isOpen={!!selectedAchievement} onClose={() => setSelectedAchievement(null)}>
                {selectedAchievement && (
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalIcon}>{selectedAchievement.icon}</div>
                            <h2 className={styles.modalTitle}>{selectedAchievement.title}</h2>
                        </div>

                        {selectedAchievement.image && (
                            <div className={styles.modalImageWrapper}>
                                <img src={selectedAchievement.image} alt={selectedAchievement.title} className={styles.modalImage} />
                            </div>
                        )}

                        <div className={styles.modalInfoGrid}>
                            <div className={styles.infoItem}>
                                <Calendar size={18} />
                                <span>Timeline: {selectedAchievement.year}</span>
                            </div>
                            <div className={styles.infoItem}>
                                <MapPin size={18} />
                                <span>Sri Lanka / Remote</span>
                            </div>
                        </div>

                        <p className={styles.modalDescription}>{selectedAchievement.longDescription}</p>
                    </div>
                )}
            </Modal>
        </section>
    );
};

export default Achievements;
