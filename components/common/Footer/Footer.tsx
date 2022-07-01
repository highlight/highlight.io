import { HighlightLogo } from '../HighlightLogo/HighlightLogo';
import styles from './Footer.module.scss';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Typography } from '../Typography/Typography';

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <div>
          <div>
            <HighlightLogo />
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
        </div>
        <div>
          <div className={styles.footerTitle}>
            <Typography type="copy3" emphasis={true}>
              Product
            </Typography>
          </div>
          <Typography type="copy3">
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
          </Typography>
        </div>
        <div>
          <div className={styles.footerTitle}>
            <Typography type="copy3" emphasis={true}>
              Developers
            </Typography>
          </div>
          <Typography type="copy3">
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
          </Typography>
        </div>
        <div>
          <div className={styles.footerTitle}>
            <Typography type="copy3" emphasis={true}>
              Legal
            </Typography>
          </div>
          <Typography type="copy3">
            <ul className={styles.footerList}>
              <li>
                <a href="https://highlight.run/terms">Terms Of Service</a>
              </li>
              <li>
                <a href="https://highlight.run/privacy">Privacy Policy</a>
              </li>
            </ul>
          </Typography>
        </div>
        <div>
          <div className={styles.footerTitle}>
            <Typography type="copy3" emphasis={true}>
              Contact
            </Typography>
          </div>
          <Typography type="copy3">
            <ul className={styles.footerList}>
              <li>
                <a href="https://careers.highlight.run/">Careers</a>
              </li>
              <li>
                <a href="mailto:sales@highlight.run">sales@highlight.run</a>
              </li>
            </ul>
          </Typography>
        </div>
      </div>
      <div className={styles.footerBottomMobile}>
        <div>
          <HighlightLogo />
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
      </div>
    </footer>
  );
};

export default Footer;
