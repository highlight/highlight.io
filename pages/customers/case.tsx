import { NextPage } from 'next';
import Link from 'next/link';
import style from '../../components/Customers/Customers.module.scss';
import { FooterCallToAction } from '../../components/common/CallToAction/FooterCallToAction';
import Footer from '../../components/common/Footer/Footer';
import Navbar from '../../components/common/Navbar/Navbar';
import ReturnIcon from '../../public/images/ReturnIcon';
import { CustomerQuote } from '../../components/Customers/CustomerQuote/CustomerQuote';
import basedashLogo from '../../public/images/companies/basedash.png';
import Image from 'next/image';
import { Typography } from '../../components/common/Typography/Typography';

const CustomerCase: NextPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className={style.detailsLayout}>
          <div className={style.caseBackLink}>
            <Link href="/customers">
              <a>
                <ReturnIcon />
                All customers
              </a>
            </Link>
          </div>
          <div className={style.caseContent}>
            <div className={style.caseTitle}>
              <span className={style.caseOverline}>Customer Case Study</span>
              <h2>Basedash</h2>
            </div>
            <CustomerQuote
              content="Highlight helps us find and fix hard to crack bugs and is a complimentary tool to our existing dev ops infrastructure. I’d recommend Highlight to any team that wants to ship fast."
              authorAvatar="/images/avatars/basedash.jpg"
              author="John Doe"
              role="Engineer"
            />
            <p>
              At Highlight, we&apos;re super focused on keeping our app snappy
              and fast. Given our product, we take responsibility for making
              sure that our users are able to quickly find the
              session/error/trace that identifies an issue as fast as possible.
            </p>
            <p>
              Recently, we&apos;ve been experimenting with quite a few methods
              to speed up larger request payloads on our <a>GraphQL</a>{' '}
              endpoints, and we found that compression has done wonders. Below,
              I&apos;ll share an overview of compression in the modern web stack
              as well as some code that can get you started!
            </p>
            <CustomerQuote
              content="Highlight helps us find and fix hard to crack bugs and is a complimentary tool to our existing dev ops infrastructure. I’d recommend Highlight to any team that wants to ship fast."
              authorAvatar="/images/avatars/basedash.jpg"
              author="John Doe"
              role="Engineer"
            />
            <h5>What is compression and how can it help me?</h5>
            <p>
              Simply put, compression algorithms recognize patterns in data and
              use these patterns to reduce the payload size sent across the
              wire. For the purpose of this discussion, we&apos;ll focus on text
              compression, but for the most part, these concepts roll over to
              other types as well (sound, video, etc..).
            </p>
            <p>
              In a modern web stack, because text is being sent over HTTP quite
              frequently (between your frontend and backend servers, for
              example), we can make use of patterns in this text to dramatically
              decrease the size of data. If this can be successfully done, your
              web server won&apos;t have to send as much data which saves
              bandwidth. Beyond that, if the amount of time taken to compress
              the data is minimal, this can also give your app a
              performance/speed boost. Overall, because there are loads of
              libraries and frameworks out there that will do this for us,
              experimenting with compression in your web app is well worth the
              effort!
            </p>
            <div className={style.casePageLinks}>
              <div className={style.casePageLink}>
                <Link href="/customers/case">
                  <a>
                    <Typography type="copy2" emphasis>
                      Previous Customer
                    </Typography>
                    <Image src={basedashLogo} alt="Previous company logo" />
                  </a>
                </Link>
              </div>
              <div className={style.casePageLink}>
                <Link href="/customers/case">
                  <a>
                    <Typography type="copy2" emphasis>
                      Next Customer
                    </Typography>
                    <Image src={basedashLogo} alt="Next company logo" />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className={style.caseCustomerDetails}>
            <div className={style.caseDetailsLogo}>
              <Image
                src={basedashLogo}
                layout="fill"
                objectFit="contain"
                objectPosition="left"
                alt="Company Logo"
              />
            </div>
            <div className={style.caseDetailsBody}>
              <div className={style.caseDetailsBlock}>
                <Typography type="copy3" emphasis>
                  About the company
                </Typography>
                <Typography type="copy3">
                  <span className={style.caseDetailsSecitonText}>
                    Make your database collaborative, editable, and protected
                    using SQL Front end software
                  </span>
                </Typography>
              </div>
              <div className={style.caseDetailsBlock}>
                <Typography type="copy3" emphasis>
                  Founded
                </Typography>
                <Typography type="copy3">
                  <span className={style.caseDetailsSecitonText}>2018</span>
                </Typography>
              </div>
              <div className={style.caseDetailsBlock}>
                <Typography type="copy3" emphasis>
                  Using Highlight since
                </Typography>
                <Typography type="copy3">
                  <span className={style.caseDetailsSecitonText}>
                    Oct. 2020
                  </span>
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterCallToAction />
      <Footer />
    </>
  );
};

export default CustomerCase;
