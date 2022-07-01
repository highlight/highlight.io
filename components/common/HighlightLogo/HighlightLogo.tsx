import Image from 'next/image';
import HighlightLogoFull from '../../../public/images/highlight-logo.png';
import styles from './HighlightLogo.module.scss';

export const HighlightLogo = () => {
  return (
    <div className={styles.logoDiv}>
      <Image src={HighlightLogoFull} alt="" />
    </div>
  );
};
