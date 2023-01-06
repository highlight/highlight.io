import {
  HighlightLogo,
  HighlightLogoWhite,
} from '../../common/HighlightLogo/HighlightLogo';
import styles from '../../common/Navbar/Navbar.module.scss';
import classNames from 'classnames';
import { PrimaryButton } from '../../common/Buttons/PrimaryButton';
import { useEffect, useState } from 'react';
import Banner from '../../common/Banner/Banner';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Link from 'next/link';
import { Typography } from '../../common/Typography/Typography';

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
  const [prevY, setPrevY] = useState(0);

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

  return (
    <>
      <Banner>
        <div className={styles.bannerContainerBlog}>
          <p>Want 1 month of free Highlight? </p>
          <a href="http://app.highlight.io/" className={styles.callToAction}>
            Register Here →
          </a>
        </div>
        <div className={styles.navContainer}>
          <ul className={classNames(styles.menuList, styles.header)}>
            <li>
              <Link href={'/pricing'} className={styles.menuItem}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href={'/#customers'} className={styles.menuItem}>
                Customers
              </Link>
            </li>
            <li>
              <Link href={'/blog'} className={styles.menuItem}>
                Blog
              </Link>
            </li>
            <li>
              <Link
                href={'https://careers.highlight.run'}
                className={styles.menuItem}
              >
                Careers
              </Link>
            </li>
            <li>
              <Link href={'/docs'} className={styles.menuItem}>
                Docs
              </Link>
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
          <Link href={'/'} className={styles.urlStyle}>
            {isOpen ? <HighlightLogoWhite /> : <HighlightLogo />}
          </Link>
          <div
            className={classNames(styles.navContainer, styles.headerLeftBlog)}
          >
            <div className={styles.navPostTitle}>{title}</div>
          </div>
          <div className={styles.navMenu} onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <AiOutlineClose className={styles.copyOnDark} />
            ) : (
              <AiOutlineMenu />
            )}
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
                <li>
                  <Typography type="copy3" emphasis={true}>
                    <Link href={'/#customers'} className={styles.menuItemLarge}>
                      Customers
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography type="copy3" emphasis={true}>
                    <Link href={'/blog'} className={styles.menuItemLarge}>
                      Blog
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography type="copy3" emphasis={true}>
                    <Link
                      href={'https://careers.highlight.run'}
                      className={styles.menuItemLarge}
                    >
                      Careers
                    </Link>
                  </Typography>
                </li>
                <li>
                  <Typography type="copy3" emphasis={true}>
                    <Link href="/docs" className={styles.menuItemLarge}>
                      Docs
                    </Link>
                  </Typography>
                </li>
              </ul>
              <div className={styles.menuButtons}>
                <PrimaryButton href="https://app.highlight.io/?sign_up=1">
                  Get Started
                </PrimaryButton>
                <Typography type="copy3" emphasis={true}>
                  <a
                    href="https://app.highlight.io/"
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
              href="https://app.highlight.io/?sign_up=1"
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
            width: `${(1 - Math.max(0, endPosition - prevY) / endPosition) * 100
              }%`,
          }}
        ></div>
      </header>
    </>
  );
};

export default BlogNavbar;
