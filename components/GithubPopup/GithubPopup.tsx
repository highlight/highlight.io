import { useState } from 'react';
import GitHubButton from 'react-github-btn';
import CrossIcon from '../../public/images/CrossIcon';
import { motion } from 'framer-motion';
import styles from './GithubPopup.module.scss';
import { useMediaQuery } from '../MediaQuery/MediaQuery';

export const GithubPopup = () => {
  const is400 = useMediaQuery(400);
  return <>{is400 ? <MobileGithubPopup /> : <DesktopGithubPopup />}</>;
};

const MobileGithubPopup = () => {
  const [hide, setHide] = useState(false);
  return hide ? (
    <></>
  ) : (
    <motion.div
      initial={{ bottom: -200 }}
      animate={{
        bottom: -38,
      }}
      transition={{
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
        delay: 1,
      }}
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2000,
      }}
    >
      <div className={styles.mobilePopup}>
        <div
          style={{
            fontSize: 18,
            fontWeight: '400',
            color: 'white',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          Star us on GitHub
        </div>
        <div style={{ marginTop: 4 }}>
          <GitHubButton
            href="https://github.com/highlight/highlight"
            data-color-scheme="no-preference: light; light: light; dark: light;"
            data-size="large"
            data-show-count="true"
            aria-label="Star highlight/highlight on GitHub"
          >
            Star
          </GitHubButton>
        </div>
        <button onClick={() => setHide(true)}>
          <CrossIcon />
        </button>
      </div>
    </motion.div>
  );
};

const DesktopGithubPopup = () => {
  const [hide, setHide] = useState(false);
  return hide ? (
    <></>
  ) : (
    <motion.div
      initial={{ bottom: -200 }}
      animate={{
        bottom: 10,
      }}
      transition={{
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
        delay: 1,
      }}
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2000,
      }}
    >
      <div className={styles.desktopPopup}>
        <div
          style={{
            fontSize: 18,
            fontWeight: '400',
            color: 'white',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          Star us on GitHub
        </div>
        <div style={{ marginTop: 4 }}>
          <GitHubButton
            href="https://github.com/highlight/highlight"
            data-color-scheme="no-preference: light; light: light; dark: light;"
            data-size="large"
            data-show-count="true"
            aria-label="Star highlight/highlight on GitHub"
          >
            Star
          </GitHubButton>
        </div>
        <button onClick={() => setHide(true)}>
          <CrossIcon />
        </button>
      </div>
    </motion.div>
  );
};
