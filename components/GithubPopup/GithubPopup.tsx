import { useEffect, useState } from 'react'
import GitHubButton from 'react-github-btn'

import { motion } from 'framer-motion'
import CrossIcon from '../../public/images/CrossIcon'
import { useMediaQuery } from '../MediaQuery/MediaQuery'
import styles from './GithubPopup.module.scss'

import { AnimateIn } from '../Animate'

export const GithubPopup = () => {
  const is400 = useMediaQuery(400)
  const [lastPageLoadTime, setLastPageLoadTime] = useState<number | undefined>(undefined)

  useEffect(() => {
    const localStorageKey = 'lastPageLoadTime'
    console.log('s:lplt')
    const lplt = JSON.parse(localStorage.getItem(localStorageKey) ?? '')
    console.log('e:lplt', lplt)
    if (lplt) {
      setLastPageLoadTime(lplt)
    }
    localStorage.setItem(localStorageKey, JSON.stringify(new Date().getTime()))
  }, [setLastPageLoadTime])

  const popup = <>{is400 ? <MobileGithubPopup /> : <DesktopGithubPopup />}</>

  const delta = lastPageLoadTime && new Date().getTime() - lastPageLoadTime

  // don't render if a render happened 60 seconds ago.
  return delta == undefined || (delta && delta > 60 * 1000) ? popup : <></>
}

const MobileGithubPopup = () => {
  const [hide, setHide] = useState(false)

  return hide ? (
    <></>
  ) : (
    <AnimateIn>
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
    </AnimateIn>
  )
}

const DesktopGithubPopup = () => {
  const [hide, setHide] = useState(false)
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
  )
}
