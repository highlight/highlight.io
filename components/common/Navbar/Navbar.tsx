import { HighlightLogo } from '../HighlightLogo/HighlightLogo';
import styles from './Navbar.module.scss';
import classNames from 'classnames';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import { AiOutlineMenu, AiOutlineClose, AiOutlineDown } from 'react-icons/ai';
import Link from 'next/link';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [developerOpen, setDeveloperOpen] = useState(false);

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

  return (
    <>
      <Banner>
        <p>Want 14 days of free Highlight? </p>
        <a href="http://app.highlight.run/">Sign Up Here</a>
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
                  <a
                    href="https://www.highlight.run/pricing"
                    className={styles.menuItemLarge}
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <Link href={'/customers'}>
                    <a className={styles.menuItemLarge}>Customers</a>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://blog.highlight.run/"
                    className={styles.menuItemLarge}
                  >
                    Blog
                  </a>
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
                      setDeveloperOpen(!developerOpen);
                    }}
                    className={styles.menuItemLarge}
                  >
                    Developers <AiOutlineDown />
                  </a>
                  {developerOpen && (
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
                <a
                  href="https://www.highlight.run/pricing"
                  className={styles.menuItem}
                >
                  Pricing
                </a>
              </li>
              <li>
                <Link href={'/customers'}>
                  <a className={styles.menuItem}>Customers</a>
                </Link>
              </li>
              <li>
                <a
                  href="https://blog.highlight.run/"
                  className={styles.menuItem}
                >
                  Blog
                </a>
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
                    setDeveloperOpen(!developerOpen);
                  }}
                  className={styles.menuItem}
                >
                  Developers <AiOutlineDown />
                </a>
                {developerOpen && (
                  <ul className={styles.menuDropdown}>
                    <li>
                      <a
                        href="https://feedback.highlight.run/changelog"
                        className={styles.menuItem}
                      >
                        Changelog
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://docs.highlight.run/"
                        className={styles.menuItem}
                      >
                        Docs
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
