import Image from 'next/image';
import Head from 'next/head';
import BlueGradient from '../../public/images/bg_blue_gradient.svg';
import PurpleGradient from '../../public/images/bg_purple_gradient.svg';
import homeStyles from '../../components/Home/Home.module.scss';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';

const Privacy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Highlight privacy policy" />
      </Head>
      <div className={homeStyles.bgPosition}>
        <div className={homeStyles.purpleDiv}>
          <Image src={PurpleGradient} alt="" />
        </div>
        <div className={homeStyles.blueDiv}>
          <Image src={BlueGradient} alt="" />
        </div>
      </div>
      <Navbar />
      <main>
        <Section>
          <div className={homeStyles.anchorTitle}>
            <h1>Privacy Policy</h1>
          </div>
        </Section>

        <p style={{ textAlign: 'center' }}>Effective date: 11/05/2020</p>

        <Section>
          <div>
            <p>1. Introduction</p>
            <p>Welcome to Highlight Inc.</p>
            <p>
              Highlight Inc. (“us”, “we”, or “our”) operates{' '}
              <a href="https://highlight.run">https://highlight.run</a>{' '}
              (hereinafter referred to as “Service”).
            </p>
            <p>
              Our Privacy Policy governs your visit to{' '}
              <a href="https://highlight.run">https://highlight.run</a>, and
              explains how we collect, safeguard and disclose information that
              results from your use of our Service.
            </p>
            <p>
              We use your data to provide and improve Service. By using Service,
              you agree to the collection and use of information in accordance
              with this policy. Unless otherwise defined in this Privacy Policy,
              the terms used in this Privacy Policy have the same meanings as in
              our Terms and Conditions.
            </p>
            <p>
              Our Terms and Conditions (“Terms”) govern all use of our Service
              and together with the Privacy Policy constitutes your agreement
              with us (“agreement”).
            </p>
            <p>2. Definitions</p>
            <p>
              SERVICE means the{' '}
              <a href="https://highlight.run">https://highlight.run</a> website
              operated by Highlight Inc.
            </p>
            <p>
              PERSONAL DATA means data about a living individual who can be
              identified from those data (or from those and other information
              either in our possession or likely to come into our possession).
            </p>
            <p>
              USAGE DATA is data collected automatically either generated by the
              use of Service or from Service infrastructure itself (for example,
              the duration of a page visit).
            </p>
            <p>
              COOKIES are small files stored on your device (computer or mobile
              device).
            </p>
            <p>
              DATA CONTROLLER means a natural or legal person who (either alone
              or jointly or in common with other persons) determines the
              purposes for which and the manner in which any personal data are,
              or are to be, processed. For the purpose of this Privacy Policy,
              we are a Data Controller of your data.
            </p>
            <p>
              DATA PROCESSORS (OR SERVICE PROVIDERS) means any natural or legal
              person who processes the data on behalf of the Data Controller. We
              may use the services of various Service Providers in order to
              process your data more effectively.
            </p>
            <p>
              DATA SUBJECT is any living individual who is the subject of
              Personal Data.
            </p>
            <p>
              THE USER is the individual using our Service. The User corresponds
              to the Data Subject, who is the subject of Personal Data.
            </p>
            <p>3. Information Collection and Use</p>
            <p>
              We collect several different types of information for various
              purposes to provide and improve our Service to you.
            </p>
            <p>4. Types of Data Collected</p>
            <p>
              Personal Data
              <br />
              While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you (“Personal Data”). Personally identifiable
              information may include, but is not limited to:
            </p>
            <p>1. Email address</p>
            <p>2. First name and last name</p>
            <p>3. Phone number</p>
            <p>4. Address, State, Province, ZIP/Postal code, City</p>
            <p>5. Cookies and Usage Data</p>
            <p>
              We may use your Personal Data to contact you with newsletters,
              marketing or promotional materials and other information that may
              be of interest to you. You may opt out of receiving any, or all,
              of these communications from us by emailing at jay@highlight.run.
            </p>
            <p>
              Usage Data
              <br />
              We may also collect information that your browser sends whenever
              you visit our Service or when you access Service by or through a
              mobile device (“Usage Data”).
            </p>
            <p>
              This Usage Data may include information such as your
              computer&apos;s Internet Protocol address (e.g. IP address),
              browser type, browser version, the pages of our Service that you
              visit, the time and date of your visit, the time spent on those
              pages, unique device identifiers and other diagnostic data.
            </p>
            <p>
              When you access Service with a mobile device, this Usage Data may
              include information such as the type of mobile device you use,
              your mobile device unique ID, the IP address of your mobile
              device, your mobile operating system, the type of mobile Internet
              browser you use, unique device identifiers and other diagnostic
              data.
            </p>
            <p>
              Tracking Cookies Data
              <br />
              We use cookies and similar tracking technologies to track the
              activity on our Service and we hold certain information.
            </p>
            <p>
              Cookies are files with a small amount of data which may include an
              anonymous unique identifier. Cookies are sent to your browser from
              a website and stored on your device. Other tracking technologies
              are also used such as beacons, tags and scripts to collect and
              track information and to improve and analyze our Service.
            </p>
            <p>
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our Service.
            </p>
            <p>Examples of Cookies we use:</p>
            <p>
              1. Session Cookies: We use Session Cookies to operate our Service.
            </p>
            <p>
              2. Preference Cookies: We use Preference Cookies to remember your
              preferences and various settings.
            </p>
            <p>
              3. Security Cookies: We use Security Cookies for security
              purposes.
            </p>
            <p>
              4. Advertising Cookies: Advertising Cookies are used to serve you
              with advertisements that may be relevant to you and your
              interests.
            </p>
            <p>5. Use of Data</p>
            <p>Highlight Inc. uses the collected data for various purposes:</p>
            <p>1. to provide and maintain our Service;</p>
            <p>2. to notify you about changes to our Service;</p>
            <p>
              3. to allow you to participate in interactive features of our
              Service when you choose to do so;
            </p>
            <p>4. to provide customer support;</p>
            <p>
              5. to gather analysis or valuable information so that we can
              improve our Service;
            </p>
            <p>6. to monitor the usage of our Service;</p>
            <p>7. to detect, prevent and address technical issues;</p>
            <p>8. to fulfill any other purpose for which you provide it;</p>
            <p>
              9. to carry out our obligations and enforce our rights arising
              from any contracts entered into between you and us, including for
              billing and collection;
            </p>
            <p>
              10. to provide you with notices about your account and/or
              subscription, including expiration and renewal notices,
              email-instructions, etc.;
            </p>
            <p>
              11. to provide you with news, special offers and general
              information about other goods, services and events which we offer
              that are similar to those that you have already purchased or
              enquired about unless you have opted not to receive such
              information;
            </p>
            <p>
              12. in any other way we may describe when you provide the
              information;
            </p>
            <p>13. for any other purpose with your consent.</p>
            <p>6. Retention of Data</p>
            <p>
              We will retain your Personal Data only for as long as is necessary
              for the purposes set out in this Privacy Policy. We will retain
              and use your Personal Data to the extent necessary to comply with
              our legal obligations (for example, if we are required to retain
              your data to comply with applicable laws), resolve disputes, and
              enforce our legal agreements and policies.
            </p>
            <p>
              We will also retain Usage Data for internal analysis purposes.
              Usage Data is generally retained for a shorter period, except when
              this data is used to strengthen the security or to improve the
              functionality of our Service, or we are legally obligated to
              retain this data for longer time periods.
            </p>
            <p>7. Transfer of Data</p>
            <p>
              Your information, including Personal Data, may be transferred to –
              and maintained on – computers located outside of your state,
              province, country or other governmental jurisdiction where the
              data protection laws may differ from those of your jurisdiction.
            </p>
            <p>
              If you are located outside United States and choose to provide
              information to us, please note that we transfer the data,
              including Personal Data, to United States and process it there.
            </p>
            <p>
              Your consent to this Privacy Policy followed by your submission of
              such information represents your agreement to that transfer.
            </p>
            <p>
              Highlight Inc. will take all the steps reasonably necessary to
              ensure that your data is treated securely and in accordance with
              this Privacy Policy and no transfer of your Personal Data will
              take place to an organisation or a country unless there are
              adequate controls in place including the security of your data and
              other personal information.
            </p>
            <p>8. Disclosure of Data</p>
            <p>
              We may disclose personal information that we collect, or you
              provide:
            </p>
            <p>
              1. Disclosure for Law Enforcement.
              <br />
              Under certain circumstances, we may be required to disclose your
              Personal Data if required to do so by law or in response to valid
              requests by public authorities.
            </p>
            <p>
              2. Business Transaction.
              <br />
              If we or our subsidiaries are involved in a merger, acquisition or
              asset sale, your Personal Data may be transferred.
            </p>
            <p>3. Other cases. We may disclose your information also:</p>
            <p>1. to our subsidiaries and affiliates;</p>
            <p>2. with your consent in any other cases;</p>
            <p>9. Security of Data</p>
            <p>
              The security of your data is important to us but remember that no
              method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially
              acceptable means to protect your Personal Data, we cannot
              guarantee its absolute security.
            </p>
            <p>
              10. Your Data Protection Rights Under General Data Protection
              Regulation (GDPR)
            </p>
            <p>
              If you are a resident of the European Union (EU) and European
              Economic Area (EEA), you have certain data protection rights,
              covered by GDPR. – See more at{' '}
              <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj">
                https://eur-lex.europa.eu/eli/reg/2016/679/oj
              </a>
            </p>
            <p>
              We aim to take reasonable steps to allow you to correct, amend,
              delete, or limit the use of your Personal Data.
            </p>
            <p>
              If you wish to be informed what Personal Data we hold about you
              and if you want it to be removed from our systems, please email us
              at jay@highlight.run.
            </p>
            <p>
              In certain circumstances, you have the following data protection
              rights:
            </p>
            <p>
              1. the right to access, update or to delete the information we
              have on you;
            </p>
            <p>
              2. the right of rectification. You have the right to have your
              information rectified if that information is inaccurate or
              incomplete;
            </p>
            <p>
              3. the right to object. You have the right to object to our
              processing of your Personal Data;
            </p>
            <p>
              4. the right of restriction. You have the right to request that we
              restrict the processing of your personal information;
            </p>
            <p>
              5. the right to data portability. You have the right to be
              provided with a copy of your Personal Data in a structured,
              machine-readable and commonly used format;
            </p>
            <p>
              6. the right to withdraw consent. You also have the right to
              withdraw your consent at any time where we rely on your consent to
              process your personal information;
            </p>
            <p>
              Please note that we may ask you to verify your identity before
              responding to such requests. Please note, we may not able to
              provide Service without some necessary data.
            </p>
            <p>
              You have the right to complain to a Data Protection Authority
              about our collection and use of your Personal Data. For more
              information, please contact your local data protection authority
              in the European Economic Area (EEA).
            </p>
            <p>
              11. Your Data Protection Rights under the California Privacy
              Protection Act (CalOPPA)
            </p>
            <p>
              CalOPPA is the first state law in the nation to require commercial
              websites and online services to post a privacy policy. The law’s
              reach stretches well beyond California to require a person or
              company in the United States (and conceivable the world) that
              operates websites collecting personally identifiable information
              from California consumers to post a conspicuous privacy policy on
              its website stating exactly the information being collected and
              those individuals with whom it is being shared, and to comply with
              this policy. – See more at:{' '}
              <a href="https://consumercal.org/about-cfc/cfc-education-foundation/california-online-privacy-protection-act-caloppa-3/">
                https://consumercal.org/about-cfc/cfc-education-foundation/california-online-privacy-protection-act-caloppa-3/
              </a>
            </p>
            <p>According to CalOPPA we agree to the following:</p>
            <p>1. users can visit our site anonymously;</p>
            <p>
              2. our Privacy Policy link includes the word “Privacy”, and can
              easily be found on the page specified above on the home page of
              our website;
            </p>
            <p>
              3. users will be notified of any privacy policy changes on our
              Privacy Policy Page;
            </p>
            <p>
              4. users are able to change their personal information by emailing
              us at jay@highlight.run.
            </p>
            <p>Our Policy on “Do Not Track” Signals:</p>
            <p>
              We honor Do Not Track signals and do not track, plant cookies, or
              use advertising when a Do Not Track browser mechanism is in place.
              Do Not Track is a preference you can set in your web browser to
              inform websites that you do not want to be tracked.
            </p>
            <p>
              You can enable or disable Do Not Track by visiting the Preferences
              or Settings page of your web browser.
            </p>
            <p>
              12. Your Data Protection Rights under the California Consumer
              Privacy Act (CCPA)
            </p>
            <p>
              If you are a California resident, you are entitled to learn what
              data we collect about you, ask to delete your data and not to sell
              (share) it. To exercise your data protection rights, you can make
              certain requests and ask us:
            </p>
            <p>
              1. What personal information we have about you. If you make this
              request, we will return to you:
            </p>
            <p>
              1. The categories of personal information we have collected about
              you.
            </p>
            <p>
              2. The categories of sources from which we collect your personal
              information.
            </p>
            <p>
              3. The business or commercial purpose for collecting or selling
              your personal information.
            </p>
            <p>
              4. The categories of third parties with whom we share personal
              information.
            </p>
            <p>
              5. The specific pieces of personal information we have collected
              about you.
            </p>
            <p>
              6. A list of categories of personal information that we have sold,
              along with the category of any other company we sold it to. If we
              have not sold your personal information, we will inform you of
              that fact.
            </p>
            <p>
              7. A list of categories of personal information that we have
              disclosed for a business purpose, along with the category of any
              other company we shared it with.
            </p>
            <p>
              Please note, you are entitled to ask us to provide you with this
              information up to two times in a rolling twelve-month period. When
              you make this request, the information provided may be limited to
              the personal information we collected about you in the previous 12
              months.
            </p>
            <p>
              2. To delete your personal information. If you make this request,
              we will delete the personal information we hold about you as of
              the date of your request from our records and direct any service
              providers to do the same. In some cases, deletion may be
              accomplished through de-identification of the information. If you
              choose to delete your personal information, you may not be able to
              use certain functions that require your personal information to
              operate.
            </p>
            <p>
              3. To stop selling your personal information. We don&apos;t sell
              or rent your personal information to any third parties for any
              purpose. You are the only owner of your Personal Data and can
              request disclosure or deletion at any time.
            </p>
            <p>
              Please note, if you ask us to delete or stop selling your data, it
              may impact your experience with us, and you may not be able to
              participate in certain programs or membership services which
              require the usage of your personal information to function. But in
              no circumstances, we will discriminate against you for exercising
              your rights.
            </p>
            <p>
              To exercise your California data protection rights described
              above, please send your request(s) by one of the following means:
            </p>
            <p>By email: jay@highlight.run</p>
            <p>
              Your data protection rights, described above, are covered by the
              CCPA, short for the California Consumer Privacy Act. To find out
              more, visit the official California Legislative Information
              website. The CCPA took effect on 01/01/2020.
            </p>
            <p>13. Service Providers</p>
            <p>
              We may employ third party companies and individuals to facilitate
              our Service (“Service Providers”), provide Service on our behalf,
              perform Service-related services or assist us in analysing how our
              Service is used.
            </p>
            <p>
              These third parties have access to your Personal Data only to
              perform these tasks on our behalf and are obligated not to
              disclose or use it for any other purpose.
            </p>
            <p>14. CI/CD tools</p>
            <p>
              We may use third-party Service Providers to automate the
              development process of our Service.
            </p>
            <p>GitHub</p>
            <p>GitHub is provided by GitHub, Inc.</p>
            <p>
              GitHub is a development platform to host and review code, manage
              projects, and build software.
            </p>
            <p>
              For more information on what data GitHub collects for what purpose
              and how the protection of the data is ensured, please visit GitHub
              Privacy Policy page:{' '}
              <a href="https://help.github.com/en/articles/github-privacy-statement">
                https://help.github.com/en/articles/github-privacy-statement
              </a>
              .
            </p>
            <p>15. Payments</p>
            <p>
              We may provide paid products and/or services within Service. In
              that case, we use third-party services for payment processing
              (e.g. payment processors).
            </p>
            <p>
              We will not store or collect your payment card details. That
              information is provided directly to our third-party payment
              processors whose use of your personal information is governed by
              their Privacy Policy. These payment processors adhere to the
              standards set by PCI-DSS as managed by the PCI Security Standards
              Council, which is a joint effort of brands like Visa, Mastercard,
              American Express and Discover. PCI-DSS requirements help ensure
              the secure handling of payment information.
            </p>
            <p>The payment processors we work with are:</p>
            <p>
              Stripe:
              <br />
              Their Privacy Policy can be viewed at:{' '}
              <a href="https://stripe.com/us/privacy">
                https://stripe.com/us/privacy
              </a>
            </p>
            <p>16. Links to Other Sites</p>
            <p>
              Our Service may contain links to other sites that are not operated
              by us. If you click a third party link, you will be directed to
              that third party&apos;s site. We strongly advise you to review the
              Privacy Policy of every site you visit.
            </p>
            <p>
              We have no control over and assume no responsibility for the
              content, privacy policies or practices of any third party sites or
              services.
            </p>
            <p>17. Children&apos;s Privacy</p>
            <p>
              Our Services are not intended for use by children under the age of
              18 (“Child” or “Children”).
            </p>
            <p>
              We do not knowingly collect personally identifiable information
              from Children under 18. If you become aware that a Child has
              provided us with Personal Data, please contact us. If we become
              aware that we have collected Personal Data from Children without
              verification of parental consent, we take steps to remove that
              information from our servers.
            </p>
            <p>18. Changes to This Privacy Policy</p>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
            </p>
            <p>
              We will let you know via email and/or a prominent notice on our
              Service, prior to the change becoming effective and update
              “effective date” at the top of this Privacy Policy.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
            <p>19. Contact Us</p>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <p>
              By email: <a href="mailto:jay@highlight.run">jay@highlight.run</a>
              .
            </p>
          </div>
        </Section>

        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Privacy;