import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <p>© {new Date().getFullYear()} Kavith Udapola. Built with passion and Next.js.</p>
                </div>
                <div className={styles.right}>
                    <a href="https://www.linkedin.com/in/kavith-udapola" target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
                    <a href="https://github.com/Kavith320" target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
                    <a href="mailto:sendtokavith@gmail.com" className={styles.link}>Email</a>
                    <a href="https://wa.me/94785153550" target="_blank" rel="noopener noreferrer" className={styles.link}>WhatsApp</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
