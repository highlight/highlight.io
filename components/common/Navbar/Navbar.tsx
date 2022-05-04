import { HighlightLogo } from '../HighlightLogo/HighlightLogo';
import styles from './Navbar.module.scss';
import classNames from 'classnames';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { useEffect, useRef, useState } from 'react';
import Banner from '../Banner/Banner';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import ChevronDown from '../../../public/images/ChevronDownIcon';
import Link from 'next/link';
import SvgBookIcon from '../../../public/images/BookIcon';
import SvgEditIcon from '../../../public/images/EditIcon';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [developerOpen, setDeveloperOpen] = useState(false);
  const [mobileDeveloperOpen, setMobileDeveloperOpen] = useState(false);

  const dropdownRef = useRef<null | HTMLUListElement>(null);

  const changeBackground = () => {
    if (window.scrollY > 60) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    changeBackground();
    window.addEventListener('scroll', changeBackground);
  });

  // Bind the navbar dropdowns to close on outside click
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDeveloperOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <Banner>
        <p>Want 1 month of free Highlight? </p>
        <a href="http://app.highlight.run/">Register Here</a>
      </Banner>
      <header
        className={classNames(styles.headerPadding, {
          [styles.blurBg]: scrolled,
          [styles.mobileHeader]: isOpen,
        })}
      >
        <div className={classNames(styles.header, styles.headerInner)}>
          <div className={classNames(styles.navContainer, styles.headerLeft)}>
            <Link href={'/'}>
              <a className={styles.urlStyle}>
                <HighlightLogo />
              </a>
            </Link>
          </div>
          <div className={styles.navMenu} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </div>
          {isOpen && (
            <div className={styles.mobileMenu}>
              <ul className={classNames(styles.menuList, styles.header)}>
                <li>
                  <Link href={'/pricing'}>
                    <a className={styles.menuItemLarge}>Pricing</a>
                  </Link>
                </li>
                <li>
                  <Link href={'/customers'}>
                    <a className={styles.menuItemLarge}>Customers</a>
                  </Link>
                </li>
                <li>
                  <Link href={'/blog'}>
                    <a className={styles.menuItemLarge}>Blog</a>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://careers.highlight.run/"
                    className={styles.menuItemLarge}
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setMobileDeveloperOpen(!mobileDeveloperOpen);
                    }}
                    className={styles.menuItemLarge}
                  >
                    Developers <ChevronDown />
                  </a>
                  {mobileDeveloperOpen && (
                    <ul className={styles.menuDropdown}>
                      <li>
                        <a
                          href="https://feedback.highlight.run/changelog"
                          className={styles.menuItemLarge}
                        >
                          Changelog
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://docs.highlight.run/"
                          className={styles.menuItemLarge}
                        >
                          Docs
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
              <a href="https://app.highlight.run/" className={styles.menuItem}>
                Sign In
              </a>
              <PrimaryButton href="https://app.highlight.run/?sign_up=1">
                Get Started
              </PrimaryButton>
            </div>
          )}
          <div className={styles.navContainer}>
            <ul className={classNames(styles.menuList, styles.header)}>
              <li>
                <Link href={'/pricing'}>
                  <a className={styles.menuItem}>Pricing</a>
                </Link>
              </li>
              <li>
                <Link href={'/customers'}>
                  <a className={styles.menuItem}>Customers</a>
                </Link>
              </li>
              <li>
                <Link href={'/blog'}>
                  <a className={styles.menuItem}>Blog</a>
                </Link>
              </li>
              <li>
                <a
                  href="https://careers.highlight.run/"
                  className={styles.menuItem}
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    setDeveloperOpen(true);
                  }}
                  className={styles.menuItem}
                >
                  Developers <ChevronDown />
                </a>
                {developerOpen && (
                  <ul ref={dropdownRef} className={styles.menuDropdown}>
                    <li>
                      <a
                        href="https://feedback.highlight.run/changelog"
                        className={styles.menuItem}
                      >
                        <div className={styles.dropdownItem}>
                          <SvgEditIcon />
                          <div>
                            <h4>Changelog</h4>
                            <div>Updates to our products</div>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://docs.highlight.run/"
                        className={styles.menuItem}
                      >
                        <div className={styles.dropdownItem}>
                          <SvgBookIcon />
                          <div>
                            <h4>Docs</h4>
                            <div>Read our documentation</div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div
            className={classNames(
              styles.navContainer,
              styles.header,
              styles.headerRight
            )}
          >
            <a href="https://app.highlight.run/" className={styles.menuItem}>
              Sign In
            </a>
            <PrimaryButton
              href="https://app.highlight.run/?sign_up=1"
              className={styles.signUpButton}
            >
              Get Started
            </PrimaryButton>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
