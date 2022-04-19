import { HighlightLogo } from '../HighlightLogo/HighlightLogo';
import styles from './Footer.module.scss';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <div>
          <div className={styles.footerTitle}>
            <h3>Product</h3>
          </div>
          <ul className={styles.footerList}>
            <li>
              <a href="https://www.highlight.run/#product">Features</a>
            </li>
            <li>
              <a href="https://www.highlight.run/#privacy">
                Privacy {'&'} Security
              </a>
            </li>
            <li>
              <a href="https://www.highlight.run/#customer">Customers</a>
            </li>
          </ul>
        </div>
        <div>
          <div className={styles.footerTitle}>
            <h3>Developers</h3>
          </div>
          <ul className={styles.footerList}>
            <li>
              <a href="https://feedback.highlight.run/changelog">Changelog</a>
            </li>
            <li>
              <a href="https://docs.highlight.run/">Documentation</a>
            </li>
            <li>
              <a href="https://docs.highlight.run/deployment-overview">
                On-Premise
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className={styles.footerTitle}>
            <h3>Legal</h3>
          </div>
          <ul className={styles.footerList}>
            <li>
              <a href="https://highlight.run/terms">Terms Of Service</a>
            </li>
            <li>
              <a href="https://highlight.run/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div>
          <div className={styles.footerTitle}>
            <h3>Contact</h3>
          </div>
          <ul className={styles.footerList}>
            <li>
              <a href="https://careers.highlight.run/">Careers</a>
            </li>
            <li>
              <a href="mailto:sales@highlight.run">sales@highlight.run</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div>
          <HighlightLogo />
          <div className={styles.copyrightText}>
            Copyright Highlight 2022. All right reserved.
          </div>
        </div>
        <div className={styles.socialDiv}>
          <a href="https://twitter.com/highlightrun">
            <FaTwitter className={styles.socialIcon} />
          </a>
          <a href="https://www.linkedin.com/company/highlightrun">
            <FaLinkedinIn className={styles.socialIcon} />
          </a>
          <a href="https://github.com/highlight-run">
            <FaGithub className={styles.socialIcon} />
          </a>
        </div>
        <div className={styles.status}>
          <a
            href="https://highlight.hyperping.io/"
            className={styles.statusDiv}
          >
            <div className={styles.statusCircle}></div>
            <div>All Systems Operational</div>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
