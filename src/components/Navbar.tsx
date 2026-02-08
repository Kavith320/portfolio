"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { usePortfolioData } from "@/hooks/usePortfolioData";

const Navbar = () => {
    const { data } = usePortfolioData();
    const heroData = data.hero;
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Projects", href: "#projects" },
        { name: "Achievements", href: "#achievements" },
        { name: "Ventures", href: "#ventures" },
        { name: "Social", href: "#social" },
        { name: "Skills", href: "#skills" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav className={`${styles.navbar} glass`}>
            <Link href="/" className={styles.logo}>
                <Image
                    src={heroData?.logo || "/logo.png"}
                    alt="Logo"
                    width={180}
                    height={60}
                    className={styles.logoImage}
                    priority
                />
            </Link>

            {/* Desktop Menu */}
            <div className={styles.desktopMenu}>
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={styles.navLink}
                    >
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.mobileToggle}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${styles.mobileMenu} glass`}
                >
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={styles.mobileNavLink}
                        >
                            {link.name}
                        </Link>
                    ))}
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
