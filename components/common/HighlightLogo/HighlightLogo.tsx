import HighlightLogoSmall from '../../../public/images/HighlightLogoSmall';
import styles from './HighlightLogo.module.scss';

export const HighlightLogo = () => {
  return (
    <div className={styles.logoDiv}>
      <HighlightLogoSmall className={styles.logo} />
      <span className={styles.logoText}>Highlight</span>
    </div>
  );
};
