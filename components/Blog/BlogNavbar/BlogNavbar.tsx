import {
  HighlightLogo,
  HighlightLogoWhite,
} from '../../common/HighlightLogo/HighlightLogo';
import styles from '../../common/Navbar/Navbar.module.scss';
import classNames from 'classnames';
import { PrimaryButton } from '../../common/Buttons/PrimaryButton';
import { useEffect, useRef, useState } from 'react';
import Banner from '../../common/Banner/Banner';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';
import { Typography } from '../../common/Typography/Typography';
import { Feature, FeatureFlag } from '../../common/FeatureFlag/FeatureFlag';

const SHOW_NAVBAR_OFFSET = 300;

const BlogNavbar = ({
  title,
  endPosition,
}: {
  title: string;
  endPosition: number;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [developerOpen, setDeveloperOpen] = useState(false);
  const [prevY, setPrevY] = useState(0);

  const dropdownRef = useRef<null | HTMLUListElement>(null);

  const changeBackground = () => {
    const currentScrollPos = window.pageYOffset;
    if (window.scrollY > SHOW_NAVBAR_OFFSET) {
      setScrolled(true);
    } else if (window.scrollY <= SHOW_NAVBAR_OFFSET) {
      setScrolled(false);
    }
    setPrevY(currentScrollPos * 1.3);
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
        <div className={styles.bannerContainer}>
          <p>Want 1 month of free Highlight? </p>
          <a href="http://app.highlight.run/" className={styles.callToAction}>
            Register Here →
          </a>
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
                  <Link
                    href={'https://docs.highlight.run'}
                    className={styles.menuItem}
                  >
                    Docs
                  </Link>
                }
                on={
                  <Link href={'/docs'} className={styles.menuItem}>
                    Docs
                  </Link>
                }
              />
            </li>
          </ul>
        </div>
      </Banner>
      <header
        className={classNames(styles.headerPadding, {
          [styles.hideNavbar]: !scrolled,
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
            <div className={styles.navPostTitle}>{title}</div>
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
                <li>
                  <Typography type="copy3" emphasis={true}>
                    <Link href={'/#customers'}>
                      <a className={styles.menuItemLarge}>Customers</a>
                    </Link>
                  </Typography>
                </li>
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
                        <Link
                          href={'https://docs.highlight.run'}
                          className={styles.menuItemLarge}
                        >
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
          <div
            className={classNames(
              styles.navContainer,
              styles.header,
              styles.headerRight
            )}
          >
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
        <div
          className={styles.loadingBar}
          style={{
            width: `${
              (1 - Math.max(0, endPosition - prevY) / endPosition) * 100
            }%`,
          }}
        ></div>
      </header>
    </>
  );
};

export default BlogNavbar;
