import {
  HighlightLogo,
  HighlightLogoWhite,
} from '../HighlightLogo/HighlightLogo';
import styles from './Navbar.module.scss';
import classNames from 'classnames';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { useEffect, useRef, useState } from 'react';
import Banner from '../Banner/Banner';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';
import { Typography } from '../Typography/Typography';
import { Feature, FeatureFlag } from '../FeatureFlag/FeatureFlag';

const Navbar = ({
  hideFreeTrialText,
  fixed,
}: {
  hideFreeTrialText?: boolean;
  fixed?: boolean;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [developerOpen, setDeveloperOpen] = useState(false);
  const [prevY, setPrevY] = useState(0);

  const dropdownRef = useRef<null | HTMLUListElement>(null);

  const changeBackground = () => {
    const currentScrollPos = window.pageYOffset;
    if (window.scrollY > 60 && prevY < currentScrollPos) {
      setScrolled(true);
    } else if (window.scrollY > 60 && prevY > currentScrollPos) {
      setScrolled(false);
    }
    setPrevY(currentScrollPos);
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
    <div
      className={classNames(styles.container, {
        [styles.hide]: scrolled && !fixed,
        [styles.fixed]: fixed,
      })}
    >
      <Banner>
        <div className={styles.bannerContainer}>
          {!hideFreeTrialText && (
            <>
              <p>Want 1 month of free Highlight? </p>
              <a
                href="http://app.highlight.run/"
                className={styles.callToAction}
              >
                Register Here →
              </a>
            </>
          )}
        </div>
        <div className={styles.navContainer}>
          <ul className={classNames(styles.menuList, styles.header)}>
            <li>
              <Link href={'/pricing'}>
                <a className={styles.menuItem}>Pricing</a>
              </Link>
            </li>
            <li>
              <Link href={'/#customers'}>
                <a className={styles.menuItem}>Customers</a>
              </Link>
            </li>
            <li>
              <Link href={'/blog'}>
                <a className={styles.menuItem}>Blog</a>
              </Link>
            </li>
            <li>
              <Link href={'https://careers.highlight.run'}>
                <a className={styles.menuItem}>Careers</a>
              </Link>
            </li>
            <li>
              <FeatureFlag
                feature={Feature.LandingPageDocs}
                off={
                  <Link href="https://docs.highlight.run">
                    <a className={styles.menuItem}>Docs</a>
                  </Link>
                }
                on={
                  <Link href="/docs">
                    <a className={styles.menuItem}>Docs</a>
                  </Link>
                }
              />
            </li>
          </ul>
        </div>
      </Banner>
      <header
        className={classNames({
          [styles.mobileHeader]: isOpen,
        })}
      >
        <div
          className={classNames(styles.header, styles.headerInner, {
            [styles.openHeader]: isOpen,
            [styles.headerBorder]: prevY != 0,
          })}
        >
          <div className={classNames(styles.navContainer, styles.headerLeft)}>
            <Link href={'/'}>
              <a className={styles.urlStyle}>
                {isOpen ? <HighlightLogoWhite /> : <HighlightLogo />}
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
                  <Typography type="copy3" emphasis={true}>
                    <Link href={'/pricing'}>
                      <a className={styles.menuItemLarge}>Pricing</a>
                    </Link>
                  </Typography>
                </li>
                {/* <li>
                  <Typography type="copy3" emphasis={true}>
                    <Link href={'/#customers'}>
                      <a className={styles.menuItemLarge}>Customers</a>
                    </Link>
                  </Typography>
                </li> */}
                <li>
                  <Typography type="copy3" emphasis={true}>
                    <Link href={'/blog'}>
                      <a className={styles.menuItemLarge}>Blog</a>
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography type="copy3" emphasis={true}>
                    <Link href={'https://careers.highlight.run'}>
                      <a className={styles.menuItemLarge}>Careers</a>
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography type="copy3" emphasis={true}>
                    <FeatureFlag
                      feature={Feature.LandingPageDocs}
                      off={
                        <Link href="https://docs.highlight.run">
                          <a className={styles.menuItemLarge}>Docs</a>
                        </Link>
                      }
                      on={
                        <Link href="/docs">
                          <a className={styles.menuItemLarge}>Docs</a>
                        </Link>
                      }
                    />
                  </Typography>
                </li>
              </ul>
              <div className={styles.menuButtons}>
                <PrimaryButton href="https://app.highlight.run/?sign_up=1">
                  Get Started
                </PrimaryButton>
                <Typography type="copy3" emphasis={true}>
                  <a
                    href="https://app.highlight.run/"
                    className={styles.menuItem}
                  >
                    Sign In
                  </a>
                </Typography>
              </div>
            </div>
          )}
          <div
            className={classNames(
              styles.navContainer,
              styles.header,
              styles.headerRight
            )}
          >
            <a
              href="https://app.highlight.run/"
              className={styles.signInButton}
            >
              <Typography type="copy2" emphasis={true}>
                Sign in
              </Typography>
            </a>
            <PrimaryButton
              href="https://app.highlight.run/?sign_up=1"
              className={styles.signUpButton}
            >
              <Typography type="copy2" emphasis={true}>
                Sign up
              </Typography>
            </PrimaryButton>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
