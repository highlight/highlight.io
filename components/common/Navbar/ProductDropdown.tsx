import { AiFillGithub } from 'react-icons/ai';
import { Popover, Transition } from '@headlessui/react'
import { Typography } from '../Typography/Typography';
import { useState } from 'react';

import { FaChevronDown } from 'react-icons/fa';
import * as Icons from "react-icons/hi";

import styles from './Navbar.module.scss';
import classNames from 'classnames';
import Link from 'next/link';


const ProductDropdown = ({
  isOpen
}: {
  isOpen?: boolean;
}) => {
  const [isShowing, setIsShowing] = useState(false)
  const mainLinks = [
    {
      title: "Frontend Monitoring",
      link: "/blog/tag/monitoring"
    },
    {
      title: "Performance Monitoring",
      link: "/blog/tag/performance"
    },
    {
      title: "Debugging and Troubleshooting",
      link: "/blog/tag/debugging"
    },
    {
      title: "Session Replay",
      link: "/blog/tag/feature"
    },
    {
      title: "Frontend Tooling",
      link: "/blog/tag/react"
    },
    {
      title: "Highlight Engineering",
      link: "/blog/tag/developers"
    },
  ]

  const otherLinks = [
    {
      title: "Status Page",
      icon: <Icons.HiCloud className={styles.copyOnLight} />,
      link: "https://highlight.hyperping.io/"
    },
    {
      title: "Changelog",
      icon: <Icons.HiClipboardList className={styles.copyOnLight} />,
      link: "https://feedback.highlight.run/changelog"
    },
    {
      title: "Feedback",
      icon: <Icons.HiChat className={styles.copyOnLight} />,
      link: "https://feedback.highlight.run"
    },
    {
      title: "Github",
      icon: <AiFillGithub className={styles.copyOnLight} />,
      link: "https://github.com/highlight-run"
    },
  ]

  return (
    <Popover>
      {({ open }) => (
      <>
      <Popover.Button 
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
        className={styles.popoverButton}
      >
        <a className={classNames(styles.headerButton, {
        [styles.white]: isShowing, 
        })}>
          <div className="flex gap-[6.5px] items-center">
            <Typography type="copy2">
              Resources
            </Typography>
            <FaChevronDown className="w-[10px]" />
          </div>
        </a>
      </Popover.Button>
      <Transition
        show={isShowing}
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        {!isOpen && <Popover.Panel className={styles.popover}>
          <div className={styles.popoverPanel}>
            <div className="pl-2 pb-[6px]">
                <Typography type="copy4" className={classNames(styles.copyOnLight)}>
                  From the Highlight blog
                </Typography>
              </div>
            <div className={styles.gridContainer}>
              {mainLinks.map((item, index) => (
                <Link key={index} href={item.link} className={styles.gridItem}>
                  <Typography type="copy3" >
                    {item.title}
                  </Typography>
                </Link>
              ))}
            </div>
            <div className={styles.innerPopoverPanel}>
              <div className="pt-2 pb-1">
                <Typography type="copy4" className={classNames(styles.copyOnLight)}>
                  Other
                </Typography>
              </div>
              <div className={styles.innerGridContainer}>
                {otherLinks.map((item, index) => (
                  <a key={index} href={item.link} target="_blank" rel="noreferrer" className={classNames(styles.gridItem, styles.innerGridItem)}>
                    {item.icon}
                    <Typography type="copy3" >
                      {item.title}
                    </Typography>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Popover.Panel>}
      </Transition>
      </>
      )}
    </Popover>
  );
};

export default ProductDropdown;