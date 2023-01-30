import Image from 'next/legacy/image'
import HighlightLogoFull from '../../../public/images/highlight-logo.png'
import HighlightLogoWhiteFull from '../../../public/images/highlight-logo-white.png'
import styles from './HighlightLogo.module.scss'

export const HighlightLogo = () => {
  return (
    <div className={styles.logoDiv}>
      <Image src={HighlightLogoFull} alt="" />
    </div>
  )
}

export const HighlightLogoWhite = () => {
  return (
    <div className={styles.logoDiv}>
      <Image src={HighlightLogoWhiteFull} alt="" />
    </div>
  )
}
