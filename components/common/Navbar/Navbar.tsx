import { HighlightLogo } from '../HighlightLogo/HighlightLogo';
import styles from './Navbar.module.scss';
import classNames from 'classnames';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import { AiOutlineMenu } from 'react-icons/ai';
import { SecondaryButton } from '../Buttons/SecondaryButton';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
            <a className={styles.urlStyle} href="https://www.highlight.run/">
              <HighlightLogo />
            </a>
          </div>
          <div className={styles.navMenu} onClick={() => setIsOpen(!isOpen)}>
            <AiOutlineMenu />
          </div>
          {isOpen && (
            <div className={styles.mobileMenu}>
              <SecondaryButton href="https://app.highlight.run/">
                Sign In
              </SecondaryButton>
              <PrimaryButton href="https://app.highlight.run/?sign_up=1">
                Get Started
              </PrimaryButton>
              <ul className={classNames(styles.menuList, styles.header)}>
                <li>
                  <a
                    href="https://www.highlight.run/pricing"
                    className={styles.menuItem}
                  >
                    Pricing
                  </a>
                </li>
                {/* <li>
            <a className={styles.menuItem}>Customers</a>
          </li> */}
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
              {/* <li>
            <a className={styles.menuItem}>Customers</a>
          </li> */}
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
