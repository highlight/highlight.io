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
import { Typography } from '../Typography/Typography';
import Link from 'next/link';
import { Feature, FeatureFlag } from '../FeatureFlag/FeatureFlag';
import ResourceDropdown from './ResourceDropdown';

const Navbar = ({
  hideFreeTrialText,
  hideNavButtons,
  hideBanner,
  fixed,
  title,
}: {
  hideFreeTrialText?: boolean;
  hideNavButtons?: boolean;
  hideBanner?: boolean;
  fixed?: boolean;
  title?: string;
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
      {!hideBanner && (
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
        </Banner>
      )}
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
            <Link href={'/'} className={styles.urlStyle}>

              {isOpen ? <HighlightLogoWhite /> : <HighlightLogo />}

            </Link>


            <Typography type="copy3" emphasis={true}>
              <p className={classNames(styles.navTitle, {
                [styles.copyOnDark]: isOpen,
                [styles.copyOnLight]: !isOpen,
              })}
              >
                {title}
              </p>
            </Typography>
          </div>
          <div className={styles.navMenu} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <AiOutlineClose className={styles.copyOnDark} /> : <AiOutlineMenu />}
          </div>
          {isOpen && (
            <div className={styles.mobileMenu}>
              <ul className={classNames(styles.menuList, styles.header)}>
                <li>
                  <Typography type="copy3" emphasis={true}>
                    <Link href={'/pricing'} className={styles.menuItemLarge}>
                      Pricing
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
                    <Link href={'/blog'} className={styles.menuItemLarge}>
                      Blog
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography type="copy3" emphasis={true}>
                    <Link href={'https://careers.highlight.run'} className={styles.menuItemLarge}>
                      Careers
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography type="copy3" emphasis={true}>
                    <FeatureFlag
                      feature={Feature.LandingPageDocs}
                      off={
                        <Link href="https://docs.highlight.run" className={styles.menuItemLarge}>
                          Docs
                        </Link>
                      }
                      on={
                        <Link href="/docs" className={styles.menuItemLarge}>
                          Docs
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
          {!hideNavButtons && (
            <div
              className={classNames(
                styles.navContainer,
                styles.header,
                styles.headerCenter
              )}
            >
              <Link
                href="/pricing"
                className={styles.headerButton}
              >
                <Typography type="copy2">
                  Pricing
                </Typography>
              </Link>
              <Link
                href="/customers"
                className={styles.headerButton}
              >
                <Typography type="copy2">
                  Customers
                </Typography>
              </Link>
             
              <ResourceDropdown isOpen={scrolled && !fixed} />
            </div>
          )}
          <div
            className={classNames(
              styles.navContainer,
              styles.header,
              styles.headerRight
            )}
          >
            <Link
              href="/docs"
              className={styles.headerButton}
            >
              <Typography type="copy2">
                Docs
              </Typography>
            </Link>
            <a
              href="https://app.highlight.run/"
              className={styles.headerButton}
            >
              <Typography type="copy2">
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
