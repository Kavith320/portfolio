import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <p>© {new Date().getFullYear()} Kavith Udapola. Built with passion and Next.js.</p>
                </div>
                <div className={styles.right}>
                    <a href="#" className={styles.link}>Twitter</a>
                    <a href="#" className={styles.link}>GitHub</a>
                    <a href="#" className={styles.link}>LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
