import React from 'react'
import { motion } from 'framer-motion'

export const AnimateIn = ({ children }: React.PropsWithChildren) => {
  return (
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
      {children}
    </motion.div>
  )
}

export const AnimateBugLeft = ({
  loaded,
  children,
}: React.PropsWithChildren<{ loaded: boolean }>) => {
  const orig = { left: -300, top: 0, opacity: 0 }
  const final = { left: 25, top: 85, opacity: 1 }
  return (
    <motion.div
      initial={orig}
      animate={loaded ? final : orig}
      transition={{
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
        delay: 1,
      }}
      style={{
        position: 'absolute',
        width: 250,
      }}
    >
      {children}
    </motion.div>
  )
}

export const AnimateBugRight = ({
  loaded,
  children,
}: React.PropsWithChildren<{ loaded: boolean }>) => {
  const orig = { right: -275, top: -95, opacity: 0 }
  const final = { right: -15, top: 30, opacity: 1 }
  return (
    <motion.div
      initial={orig}
      animate={loaded ? final : orig}
      transition={{
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
        delay: 1,
      }}
      style={{
        position: 'absolute',
        width: 250,
      }}
    >
      {children}
    </motion.div>
  )
}
