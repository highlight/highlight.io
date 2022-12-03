import { Popover, Transition } from '@headlessui/react'
import { Typography } from '../Typography/Typography';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

import { iProduct, PRODUCTS } from '../../Products/products';

import styles from './ProductDropdown.module.scss';
import classNames from 'classnames';
import Link from 'next/link';


const ProductDropdown = ({
  isOpen
}: {
  isOpen?: boolean;
}) => {
  const [isShowing, setIsShowing] = useState(false)

  let frontendLinks = Object.values(PRODUCTS).filter((product) => { return !product.isBackend })
  let backendLinks = Object.values(PRODUCTS).filter((product) => { return product.isBackend })

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
                  Product
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
                <div className={styles.gridContainer}>
                  <div className={styles.innerContainer}>
                    <div className="pb-1">
                      <Typography type="copy4" className="pl-2 text-color-copy-on-light">
                        Frontend
                      </Typography>
                    </div>
                    <div className={styles.innerGridLeft}>
                      {frontendLinks.map((item, index) => (
                        <Link key={index} href={"/products/" + item.slug} className={styles.link}>
                          <Typography type="copy3">
                            {item.title}
                          </Typography>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className={styles.innerContainer}>
                    <div className="pb-1">
                      <Typography type="copy4" className="pl-2 text-color-copy-on-light">
                        Backend
                      </Typography>
                    </div>
                    <div className={styles.innerGridRight}>
                      {backendLinks.map((item, index) => (
                        <Link key={index} href={"/products/" + item.slug} className={styles.link}>
                          <Typography type="copy3">
                            {item.title}
                          </Typography>
                        </Link>
                      ))}
                    </div>
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