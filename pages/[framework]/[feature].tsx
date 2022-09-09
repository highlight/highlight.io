import Navbar from '../../components/common/Navbar/Navbar';
import Footer from '../../components/common/Footer/Footer';
import { gql, GraphQLClient } from 'graphql-request';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import classNames from 'classnames';
import { Typography } from '../../components/common/Typography/Typography';
import { Meta } from '../../components/common/Head/Meta';
import { Section } from '../../components/common/Section/Section';
import { CompaniesReel } from '../../components/Home/CompaniesReel/CompaniesReel';
import { REVIEWS } from '../../components/Home/Reviews';
import { CustomerReview } from '../../components/common/CustomerReview/CustomerReview';
import styles from '../../components/Home/Home.module.scss';
import { IMAGE_SHOW_OFFSET } from '..';
import Image from 'next/image';
import { ObfuscationSlider } from '../../components/Home/ObfuscationSlider/ObfuscationSlider';
import { Collapse } from 'antd';

import MultipleIcon from '../../public/images/multiple.svg';
import PuzzleIcon from '../../public/images/puzzle.svg';
import ChartbarIcon from '../../public/images/chart-bar.svg';
import MagnifierIcon from '../../public/images/magnifier.svg';
import VerifiedIcon from '../../public/images/verified.svg';
import PlugIcon from '../../public/images/plug.svg';

import CollaborateImage from '../../public/images/collaborate.png';
import SearchImage from '../../public/images/search.svg';
import TwoHighlightersImage from '../../public/images/two-highlighters.gif';
import Tablet1 from '../../public/images/tablet1.svg';
import WebVitalsImage from '../../public/images/webvitals.svg';
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton';
import { CodeSnippet } from '../../components/Home/CodeSnippet/CodeSnippet';
import { PrimaryLink } from '../../components/common/Buttons/SecondaryButton';

const { Panel } = Collapse;

export const graphcms = new GraphQLClient(
  'https://api-us-west-2.graphcms.com/v2/cl2tzedef0o3p01yz7c7eetq8/master',
  {
    headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
  }
);

const FEATURES_MAP: { [k: string]: string } = {
  webvitals: 'Web Vitals',
  performance: 'Performance Metrics',
};

export const getStaticPaths: GetStaticPaths = async () => {
  const QUERY = gql`
    {
      frontendFrameworks {
        slug
      }
    }
  `;
  const { frontendFrameworks } = await graphcms.request(QUERY);

  return {
    paths: Object.keys(FEATURES_MAP)
      .map((feature) =>
        frontendFrameworks.map((p: { slug: string }) => ({
          params: { framework: p.slug, feature: feature },
        }))
      )
      .flat(),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const feature = (params?.feature as string) || '';
  const framework = params?.framework as string;

  const QUERY = gql`
    query GetFrontendFramework($slug: String!) {
      frontendFramework(where: { slug: $slug }) {
        frameworkName
        image {
          url
        }
      }
    }
  `;
  const data = await graphcms.request(QUERY, { slug: framework });

  // Handle event slugs which don't exist in our CMS
  if (!data.frontendFramework) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      framework: data.frontendFramework,
      feature,
    },
    revalidate: 60 * 60, // Cache response for 1 hour (60 seconds * 60 minutes)
  };
};

const WebVitals = ({
  framework,
  feature,
}: {
  framework: any;
  feature: string;
}) => {
  const section1 = useRef<HTMLDivElement>(null);
  const section2 = useRef<HTMLDivElement>(null);
  const section3 = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const scrollYPosition = useRef<number>(0);
  const [offsetPosition, setOffsetPosition] = useState(0);
  const [scrollReviews, setScrollReviews] = useState(false);
  const [featureImageIndex, setFeatureImageIndex] = useState(0);
  const [firstCollapseIndex, setFirstCollapseIndex] = useState('1');
  const [secondCollapseIndex, setSecondCollapseIndex] = useState('1');

  const scrollListener = useCallback(() => {
    if (
      (section2?.current?.getBoundingClientRect().y || 0) < IMAGE_SHOW_OFFSET
    ) {
      setFeatureImageIndex(1);
    } else {
      setFeatureImageIndex(0);
    }

    if (!scrollReviews) {
      return;
    }

    if (reviewsRef.current) {
      const { scrollY } = window;
      const scrollingDown = scrollYPosition.current > scrollY;
      // Adjust this value to control scroll speed
      const scrollDistance = scrollingDown ? -3 : 3;
      reviewsRef.current.scrollLeft += scrollDistance;
      scrollYPosition.current = scrollY;
    }
  }, [scrollReviews]);

  useEffect(() => {
    window.removeEventListener('scroll', scrollListener);
    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, [scrollListener]);

  useEffect(() => {
    setOffsetPosition(section1.current?.offsetHeight || 0);
  }, [section1]);

  useEffect(() => {
    const reviewsElement = reviewsRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrollReviews(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '250px 0px',
        threshold: 0,
      }
    );

    if (reviewsElement) {
      observer.observe(reviewsElement);

      // Scroll to center on load
      reviewsElement.scrollLeft =
        (reviewsElement.scrollWidth - window.innerWidth) / 2;
    }

    return () => {
      if (reviewsElement) {
        observer.unobserve(reviewsElement);
      }
    };
  }, [reviewsRef]);

  return (
    <>
      <Meta
        title={`Highlight for ${framework.frameworkName}`}
        description={`${FEATURES_MAP[feature]} for your ${framework.frameworkName} App`}
      />
      <Navbar />
      <main>
        <Section className={styles.heroVideoWrapper}>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorHead}>
              <div className={styles.sectionSubtitle}>
                <Typography type="outline">frontend observability</Typography>
              </div>
              <h1>{`${FEATURES_MAP[feature]} for your ${framework.frameworkName} Application`}</h1>
              <Typography type="copy1" onDark>
                The Highlight snippet automatically instruments your web app to
                record web vitals and frontend performance metrics. Maintain the
                ⚡️ of your web app.
              </Typography>
            </div>
            <div
              className={classNames(styles.buttonContainer, styles.heroImage)}
            >
              <PrimaryButton href="https://app.highlight.run/?sign_up=1">
                <Typography type="copy2" emphasis={true}>
                  Get started for free
                </Typography>
              </PrimaryButton>
            </div>
            <div
              className={classNames(
                styles.heroImage,
                styles.imageInner,
                styles.generatedImage
              )}
            >
              <Image src={WebVitalsImage} alt="" />
            </div>
          </div>
        </Section>
        <div className={styles.secondaryBackground}>
          <Section>
            <div className={styles.anchorFeature}>
              <div
                className={classNames(
                  styles.anchorTitle,
                  styles.secondaryAnchor
                )}
              >
                <h2>
                  Keep your Web App{' '}
                  <span className={styles.highlightedText}>Snappy</span>, like
                  it should be.
                </h2>
              </div>
            </div>
          </Section>
          <Section className={styles.hidePhone} noYBottomPadding>
            <div className={styles.featuresColumnContainer}>
              <div className={styles.featuresLeftColumn}>
                <div ref={section1} className={styles.featuresSection}>
                  <div>
                    <div className={styles.sectionSubtitle}>
                      <Typography type="outline">
                        cross-team collaboration
                      </Typography>
                    </div>
                    <h3>
                      <span className={styles.highlightedText}>
                        Collaborate
                      </span>{' '}
                      on bugs, everyone is kept in the loop.
                    </h3>
                    <Collapse
                      accordion
                      destroyInactivePanel={true}
                      activeKey={firstCollapseIndex}
                      className={styles.sectionCollapse}
                    >
                      <Panel
                        header={
                          <div
                            className={styles.collapseHeader}
                            onMouseEnter={() => setFirstCollapseIndex('1')}
                          >
                            <Image src={MultipleIcon} alt="" />
                            <Typography
                              type="copy1"
                              emphasis={true}
                            >{`There's never one stakeholder on a bug.`}</Typography>
                          </div>
                        }
                        className={styles.sectionInfo}
                        key="1"
                        showArrow={false}
                      >
                        <div className={styles.sectionBody}>
                          <Typography type="copy2">
                            When something breaks on your web app, there are
                            many teams that could get the first message about
                            it. Highlight makes it easy to communicate and
                            re-assign issues to make decisions on errors faster.
                          </Typography>
                        </div>
                      </Panel>
                      <Panel
                        header={
                          <div
                            className={styles.collapseHeader}
                            onMouseEnter={() => setFirstCollapseIndex('2')}
                          >
                            <Image src={PuzzleIcon} alt="" />
                            <Typography
                              type="copy1"
                              emphasis={true}
                            >{`Integrate with your favorite tools.`}</Typography>
                          </div>
                        }
                        className={styles.sectionInfo}
                        key="2"
                        showArrow={false}
                      >
                        <div className={styles.sectionBody}>
                          <Typography type="copy2">{`We understand that Highlight isn't your issue tracking tool or your customer data platform. That's why we integrate with tools like Slack, Clickup and Zapier to keep everyone in the loop.`}</Typography>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
                <div ref={section2} className={styles.featuresSection}>
                  <div>
                    <div className={styles.sectionSubtitle}>
                      <Typography type="outline">Powerful search</Typography>
                    </div>
                    <h3>
                      <span className={styles.highlightedText}>
                        Easily search
                      </span>{' '}
                      for a bug by session or specific property.
                    </h3>
                    <Collapse
                      accordion
                      destroyInactivePanel={true}
                      activeKey={secondCollapseIndex}
                      className={styles.sectionCollapse}
                    >
                      <Panel
                        header={
                          <div
                            className={styles.collapseHeader}
                            onMouseEnter={() => setSecondCollapseIndex('1')}
                          >
                            <Image src={MagnifierIcon} alt="" />
                            <Typography
                              type="copy1"
                              emphasis={true}
                            >{`Get to the correct session instantly.`}</Typography>
                          </div>
                        }
                        className={styles.sectionInfo}
                        key="1"
                        showArrow={false}
                      >
                        <div className={styles.sectionBody}>
                          <Typography type="copy2">
                            What if you step in the shoes of your users and
                            debug from their perspective? With our search
                            console, you can instantly find the right session
                            and debug with confidence.
                          </Typography>
                        </div>
                      </Panel>
                      <Panel
                        header={
                          <div
                            className={styles.collapseHeader}
                            onMouseEnter={() => setSecondCollapseIndex('2')}
                          >
                            <Image src={ChartbarIcon} alt="" />
                            <Typography type="copy1" emphasis={true}>{`
                    What is slowing down your users?`}</Typography>
                          </div>
                        }
                        className={styles.sectionInfo}
                        key="2"
                        showArrow={false}
                      >
                        <div className={styles.sectionBody}>
                          <Typography type="copy2">
                            Are users not using a new feature? Or is there a
                            known drop off in a specific user flow? Our search
                            console gives you the ability to search based on
                            URL, number of errors, user properties and much
                            more!
                          </Typography>
                        </div>
                      </Panel>
                    </Collapse>
                  </div>
                </div>
              </div>
              <div
                className={styles.featuresRightColumn}
                style={{
                  marginTop: `calc(-1 * ${offsetPosition * 0.2}px)`,
                }}
              >
                <div
                  className={classNames({
                    [styles.hideImage]: featureImageIndex !== 0,
                  })}
                >
                  <div
                    className={classNames(styles.imageInner, styles.hideMobile)}
                  >
                    <Image src={CollaborateImage} alt="" />
                  </div>
                  <div
                    className={classNames(
                      styles.imageInner,
                      styles.tabletGraphic
                    )}
                  >
                    <Image src={Tablet1} alt="" />
                  </div>
                </div>
                <div
                  className={classNames({
                    [styles.hideImage]: featureImageIndex !== 1,
                  })}
                >
                  <div
                    className={classNames(
                      styles.imageInner,
                      styles.hideMobile,
                      styles.search
                    )}
                  >
                    <Image src={SearchImage} alt="" />
                    <div className={styles.searchTwoHighlighters}>
                      <Image src={TwoHighlightersImage} alt="" />
                    </div>
                  </div>
                  <div
                    className={classNames(
                      styles.imageInner,
                      styles.tabletGraphic
                    )}
                  >
                    <Image src={TwoHighlightersImage} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>

        <Section grid>
          <div className={styles.gridSectionImageLeft}>
            <CodeSnippet
              image={
                <Image
                  src={framework.image?.url || ''}
                  alt=""
                  layout="fill"
                  objectFit="contain"
                />
              }
              canCopy={true}
              language="html"
              content={
                framework.snippet ||
                `<html>
  <head>
      <script src="https://cdn.jsdelivr.net/npm/highlight.run@latest"></script>
      <script>
          window.H.init("your-api-key")
      </script>
  </head>
  <body>
      <!-- Your Application -->
  </body>
</html>`
              }
            />
          </div>
          <div className={classNames(styles.sectionText, styles.codeSection)}>
            <div className={styles.sectionSubtitle}>
              <Typography type="outline">effortless setup</Typography>
            </div>
            <h2>
              Use Highlight{' '}
              <span className={styles.highlightedText}>within minutes</span>
            </h2>
            <Typography type="copy2" onDark>
              {`Installing Highlight is a matter of selecting your frontend framework and adding three lines of code to your app. Highlight is built to be framework agnostic, so regardless of your stack, we have a solution that'll work for your team. You'll be off to the races in a matter of minutes!`}
            </Typography>
            <div className={styles.buttonContainer}>
              <PrimaryLink href="https://docs.highlight.run/getting-started">
                Read more about our backend integrations in beta
              </PrimaryLink>
            </div>
          </div>
        </Section>
        <Section>
          <CompaniesReel />
        </Section>
        <Section>
          <div className={styles.anchorFeature}>
            <div className={styles.anchorHead}>
              <Typography type="copy2" onDark>
                Don&apos;t take our word for it. Here&apos;s what our customers
                have to say.
              </Typography>
            </div>
          </div>
        </Section>
        <div className={styles.slider} ref={reviewsRef}>
          <div className={styles.slideTrack}>
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <CustomerReview
                key={i}
                companyLogo={review.companyLogo}
                text={review.text}
                author={review.author}
                scale={review.scale}
              />
            ))}
          </div>
        </div>
        <FooterCallToAction />
      </main>
      <Footer />
    </>
  );
};

export default WebVitals;
