import { HighlightLogo } from '../HighlightLogo/HighlightLogo';
import styles from './Footer.module.scss';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Typography } from '../Typography/Typography';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.footerBottom}>
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
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <a href="https://app.highlight.run/?sign_up=1">Sign up</a>
              </li>
              <li>
                <a href="https://www.highlight.io/#product">Features</a>
              </li>
              <li>
                <a href="https://www.highlight.io/#privacy">
                  Privacy {'&'} Security
                </a>
              </li>
              <li>
                <Link href="/#customers">Customers</Link>
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
                <a href="https://feedback.highlight.io/changelog">Changelog</a>
              </li>
              <li>
                <a href="https://docs.highlight.io/">Documentation</a>
              </li>
              <li>
                <a href="https://docs.highlight.io/deployment-overview">
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
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
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
                <a href="mailto:sales@highlight.io">sales@highlight.io</a>
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
