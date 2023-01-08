import { Popover, Transition } from '@headlessui/react'
import { Typography } from '../Typography/Typography';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { PRODUCTS } from '../../Products/products';

import styles from './ProductDropdown.module.scss';
import classNames from 'classnames';
import Link from 'next/link';


const ProductDropdown = ({
  isOpen
}: {
  isOpen?: boolean;
}) => {

  const frontendProductLinks = Object.values(PRODUCTS).filter((product) => { return product.type == "frontend" })
  const backendProductLinks = Object.values(PRODUCTS).filter((product) => { return product.type == "backend" })
  const fullStackProductLinks = Object.values(PRODUCTS).filter((product) => { return product.type == "fullstack" })

  const [isShowing, setIsShowing] = useState(false)
  const [selected, setSelected] = useState("frontend");
  const [selectedLinks, setSelectedLinks] = useState(frontendProductLinks);

  function handleCategorySelect(select: String) {
    switch (select) {
      case "frontend":
        setSelected("frontend");
        setSelectedLinks(frontendProductLinks);
        break;
      case "backend":
        setSelected("backend");
        setSelectedLinks(backendProductLinks);
        break;
      case "fullstack":
        setSelected("fullstack");
        setSelectedLinks(fullStackProductLinks);
        break;
      default:
        setSelected("frontend");
        setSelectedLinks(frontendProductLinks);
    }
  }


  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            onMouseEnter={() => setIsShowing(true)}
            onMouseLeave={() => setIsShowing(true)}
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
            onMouseLeave={() => setIsShowing(true)}
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
                    <div className={styles.innerGridLeft}>
                      <div
                        onClick={() => handleCategorySelect("frontend")}
                        className={classNames(styles.categoryButton, {
                          [styles.categoryButtonActive]: selected == "frontend",
                        })}>
                        <Typography type="copy4" className="pl-2">
                          Frontend
                        </Typography>
                      </div>
                      <div
                        onClick={() => handleCategorySelect("backend")}
                        className={classNames(styles.categoryButton, {
                          [styles.categoryButtonActive]: selected == "backend",
                        })}>
                        <Typography type="copy4" className="pl-2">
                          Backend
                        </Typography>
                      </div>
                      <div
                        onClick={() => handleCategorySelect("fullstack")}
                        className={classNames(styles.categoryButton, {
                          [styles.categoryButtonActive]: selected == "fullstack",
                        })}>
                        <Typography type="copy4" className="pl-2">
                          Fullstack
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className={styles.innerContainer}>
                    <div>
                      <Typography type="copy3" className="pl-2 text-color-copy-on-light">
                        Backend
                      </Typography>
                    </div>
                    <div className={styles.innerGridRight}>
                      {selectedLinks.map((item, index) => (
                        <Link key={index} href={"/for/" + item.slug} className={styles.link}>
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