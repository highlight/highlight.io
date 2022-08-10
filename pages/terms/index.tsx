import Head from 'next/head';
import homeStyles from '../../components/Home/Home.module.scss';
import Navbar from '../../components/common/Navbar/Navbar';
import { Section } from '../../components/common/Section/Section';
import Footer from '../../components/common/Footer/Footer';
import { CallToAction } from '../../components/common/CallToAction/CallToAction';
import Link from 'next/link';
import { Meta } from '../../components/common/Head/Meta';

const Terms = () => {
  return (
    <>
      <Head>
        <title>Highlight: Terms of Service</title>
        <Meta
          title={'Highlight: Terms of Service'}
          description={'Highlight: Terms of Service'}
        />
      </Head>
      <Navbar />
      <main>
        <Section>
          <div className={homeStyles.anchorTitle}>
            <h1>Terms of Service</h1>
          </div>
        </Section>

        <p style={{ textAlign: 'center' }}>Effective date: 11/04/2020</p>

        <Section>
          <div>
            <p>
              <b>1. Introduction</b>
              <br />
              Welcome to Highlight Inc. (“Company”, “we”, “our”, “us”)! As you
              have just clicked our Terms of Service, please pause, grab a cup
              of coffee and carefully read the following pages. It will take you
              approximately 20 minutes.
            </p>
            <p>
              These Terms of Service (“Terms”, “Terms of Service”) govern your
              use of our web pages located at https://highlight.io operated by
              Highlight Inc.
            </p>
            <p>
              Our Privacy Policy also governs your use of our Service and
              explains how we collect, safeguard and disclose information that
              results from your use of our web pages. Please read it here{' '}
              <Link href="/privacy">https://highlight.io/privacy</Link>.
            </p>
            <p>
              Your agreement with us includes these Terms and our Privacy Policy
              (“Agreements”). You acknowledge that you have read and understood
              Agreements, and agree to be bound of them.
            </p>
            <a>
              If you do not agree with (or cannot comply with) Agreements, then
              you may not use the Service, but please let us know by emailing at
              <a href="mailto:jay@highlight.io">jay@highlight.io</a> so we can
              try to find a solution. These Terms apply to all visitors, users
              and others who wish to access or use Service.
            </a>
            <p>Thank you for being responsible.</p>
            <p>
              <b>2. Communications</b>
              <br />
              By creating an Account on our Service, you agree to subscribe to
              newsletters, marketing or promotional materials and other
              information we may send. However, you may opt out of receiving
              any, or all, of these communications from us by following the
              unsubscribe link or by emailing at.
            </p>
            <p>
              <b>3. Purchases</b>
              <br />
              If you wish to purchase any product or service made available
              through Service (“Purchase”), you may be asked to supply certain
              information relevant to your Purchase including, without
              limitation, your credit card number, the expiration date of your
              credit card, your billing address, and your shipping information.
            </p>
            <p>
              You represent and warrant that: (i) you have the legal right to
              use any credit card(s) or other payment method(s) in connection
              with any Purchase; and that (ii) the information you supply to us
              is true, correct and complete.
            </p>
            <p>
              We may employ the use of third party services for the purpose of
              facilitating payment and the completion of Purchases. By
              submitting your information, you grant us the right to provide the
              information to these third parties subject to our Privacy Policy.
            </p>
            <p>
              We reserve the right to refuse or cancel your order at any time
              for reasons including but not limited to: product or service
              availability, errors in the description or price of the product or
              service, error in your order or other reasons.
            </p>
            <p>
              We reserve the right to refuse or cancel your order if fraud or an
              unauthorized or illegal transaction is suspected.
            </p>
            <p>
              <b>4. Contests, Sweepstakes and Promotions</b>
              <br />
              Any contests, sweepstakes or other promotions (collectively,
              “Promotions”) made available through Service may be governed by
              rules that are separate from these Terms of Service. If you
              participate in any Promotions, please review the applicable rules
              as well as our Privacy Policy. If the rules for a Promotion
              conflict with these Terms of Service, Promotion rules will apply.
            </p>
            <p>
              <b>5. Subscriptions</b>
              <br />
              Some parts of Service are billed on a subscription basis
              (“Subscription(s)”). You will be billed in advance on a recurring
              and periodic basis (“Billing Cycle”). Billing cycles are set
              either on a monthly or annual basis, depending on the type of
              subscription plan you select when purchasing a Subscription.
            </p>
            <p>
              At the end of each Billing Cycle, your Subscription will
              automatically renew under the exact same conditions unless you
              cancel it or Highlight Inc. cancels it. You may cancel your
              Subscription renewal either through your online account management
              page or by contacting Highlight Inc. customer support team.
            </p>
            <p>
              A valid payment method, including credit card or PayPal, is
              required to process the payment for your subscription. You shall
              provide Highlight Inc. with accurate and complete billing
              information including full name, address, state, zip code,
              telephone number, and a valid payment method information. By
              submitting such payment information, you automatically authorize
              Highlight Inc. to charge all Subscription fees incurred through
              your account to any such payment instruments.
            </p>
            <p>
              Should automatic billing fail to occur for any reason, Highlight
              Inc. will issue an electronic invoice indicating that you must
              proceed manually, within a certain deadline date, with the full
              payment corresponding to the billing period as indicated on the
              invoice.
            </p>
            <p>
              <b>6. Free Trial</b>
              <br />
              Highlight Inc. may, at its sole discretion, offer a Subscription
              with a free trial for a limited period of time (“Free Trial”).
            </p>
            <p>
              You may be required to enter your billing information in order to
              sign up for Free Trial.
            </p>
            <p>
              If you do enter your billing information when signing up for Free
              Trial, you will not be charged by Highlight Inc. until Free Trial
              has expired. On the last day of Free Trial period, unless you
              cancelled your Subscription, you will be automatically charged the
              applicable Subscription fees for the type of Subscription you have
              selected.
            </p>
            <p>
              At any time and without notice, Highlight Inc. reserves the right
              to (i) modify Terms of Service of Free Trial offer, or (ii) cancel
              such Free Trial offer.
            </p>
            <p>
              <b>7. Fee Changes</b>
              <br />
              Highlight Inc., in its sole discretion and at any time, may modify
              Subscription fees for the Subscriptions. Any Subscription fee
              change will become effective at the end of the then-current
              Billing Cycle.
            </p>
            <p>
              Highlight Inc. will provide you with a reasonable prior notice of
              any change in Subscription fees to give you an opportunity to
              terminate your Subscription before such change becomes effective.
            </p>
            <p>
              Your continued use of Service after Subscription fee change comes
              into effect constitutes your agreement to pay the modified
              Subscription fee amount.
            </p>
            <p>
              <b>8. Refunds</b>
              <br />
              We issue refunds for Contracts within sixty (60) days of the
              original purchase of the Contract.
            </p>
            <p>
              <b>9. Content</b>
              <br />
              Our Service allows you to post, link, store, share and otherwise
              make available certain information, text, graphics, videos, or
              other material (“Content”). You are responsible for Content that
              you post on or through Service, including its legality,
              reliability, and appropriateness.
            </p>
            <p>
              By posting Content on or through Service, You represent and
              warrant that: (i) Content is yours (you own it) and/or you have
              the right to use it and the right to grant us the rights and
              license as provided in these Terms, and (ii) that the posting of
              your Content on or through Service does not violate the privacy
              rights, publicity rights, copyrights, contract rights or any other
              rights of any person or entity. We reserve the right to terminate
              the account of anyone found to be infringing on a copyright.
            </p>
            <p>
              You retain any and all of your rights to any Content you submit,
              post or display on or through Service and you are responsible for
              protecting those rights. We take no responsibility and assume no
              liability for Content you or any third party posts on or through
              Service. However, by posting Content using Service you grant us
              the right and license to use, modify, publicly perform, publicly
              display, reproduce, and distribute such Content on and through
              Service. You agree that this license includes the right for us to
              make your Content available to other users of Service, who may
              also use your Content subject to these Terms.
            </p>
            <p>
              Highlight Inc. has the right but not the obligation to monitor and
              edit all Content provided by users.
            </p>
            <p>
              In addition, Content found on or through this Service are the
              property of Highlight Inc. or used with permission. You may not
              distribute, modify, transmit, reuse, download, repost, copy, or
              use said Content, whether in whole or in part, for commercial
              purposes or for personal gain, without express advance written
              permission from us.
            </p>
            <p>
              <b>10. Prohibited Uses</b>
              <br />
              You may use Service only for lawful purposes and in accordance
              with Terms. You agree not to use Service:
            </p>
            <p>
              1. In any way that violates any applicable national or
              international law or regulation.
            </p>
            <p>
              2. For the purpose of exploiting, harming, or attempting to
              exploit or harm minors in any way by exposing them to
              inappropriate content or otherwise.
            </p>
            <p>
              3. To transmit, or procure the sending of, any advertising or
              promotional material, including any “junk mail”, “chain letter,”
              “spam,” or any other similar solicitation.
            </p>
            <p>
              4. To impersonate or attempt to impersonate Company, a Company
              employee, another user, or any other person or entity.
            </p>
            <p>
              5. In any way that infringes upon the rights of others, or in any
              way is illegal, threatening, fraudulent, or harmful, or in
              connection with any unlawful, illegal, fraudulent, or harmful
              purpose or activity.
            </p>
            <p>
              6. To engage in any other conduct that restricts or inhibits
              anyone’s use or enjoyment of Service, or which, as determined by
              us, may harm or offend Company or users of Service or expose them
              to liability.
            </p>
            <p>Additionally, you agree not to:</p>
            <p>
              1. Use Service in any manner that could disable, overburden,
              damage, or impair Service or interfere with any other party’s use
              of Service, including their ability to engage in real time
              activities through Service.
            </p>
            <p>
              2. Use any robot, spider, or other automatic device, process, or
              means to access Service for any purpose, including monitoring or
              copying any of the material on Service.
            </p>
            <p>
              3. Use any manual process to monitor or copy any of the material
              on Service or for any other unauthorized purpose without our prior
              written consent.
            </p>
            <p>
              4. Use any device, software, or routine that interferes with the
              proper working of Service.
            </p>
            <p>
              5. Introduce any viruses, trojan horses, worms, logic bombs, or
              other material which is malicious or technologically harmful.
            </p>
            <p>
              6. Attempt to gain unauthorized access to, interfere with, damage,
              or disrupt any parts of Service, the server on which Service is
              stored, or any server, computer, or database connected to Service.
            </p>
            <p>
              7. Attack Service via a denial-of-service attack or a distributed
              denial-of-service attack.
            </p>
            <p>8. Take any action that may damage or falsify Company rating.</p>
            <p>
              9. Otherwise attempt to interfere with the proper working of
              Service.
            </p>
            <p>
              <b>11. No Use By Minors</b>
              <br />
              Service is intended only for access and use by individuals at
              least eighteen (18) years old. By accessing or using any of
              Company, you warrant and represent that you are at least eighteen
              (18) years of age and with the full authority, right, and capacity
              to enter into this agreement and abide by all of the terms and
              conditions of Terms. If you are not at least eighteen (18) years
              old, you are prohibited from both the access and usage of Service.
            </p>
            <p>
              <b>12. Accounts</b>
              <br />
              When you create an account with us, you guarantee that you are
              above the age of 18, and that the information you provide us is
              accurate, complete, and current at all times. Inaccurate,
              incomplete, or obsolete information may result in the immediate
              termination of your account on Service.
            </p>
            <p>
              You are responsible for maintaining the confidentiality of your
              account and password, including but not limited to the restriction
              of access to your computer and/or account. You agree to accept
              responsibility for any and all activities or actions that occur
              under your account and/or password, whether your password is with
              our Service or a third-party service. You must notify us
              immediately upon becoming aware of any breach of security or
              unauthorized use of your account.
            </p>
            <p>
              You may not use as a username the name of another person or entity
              or that is not lawfully available for use, a name or trademark
              that is subject to any rights of another person or entity other
              than you, without appropriate authorization. You may not use as a
              username any name that is offensive, vulgar or obscene.
            </p>
            <p>
              We reserve the right to refuse service, terminate accounts, remove
              or edit content, or cancel orders in our sole discretion.
            </p>
            <p>
              <b>13. Intellectual Property</b>
              <br />
              Service and its original content (excluding Content provided by
              users), features and functionality are and will remain the
              exclusive property of Highlight Inc. and its licensors. Service is
              protected by copyright, trademark, and other laws of the United
              States. Our trademarks and trade dress may not be used in
              connection with any product or service without the prior written
              consent of Highlight Inc..
            </p>
            <p>
              <b>14. Copyright Policy</b>
              <br />
              We respect the intellectual property rights of others. It is our
              policy to respond to any claim that Content posted on Service
              infringes on the copyright or other intellectual property rights
              (“Infringement”) of any person or entity.
            </p>
            <p>
              If you are a copyright owner, or authorized on behalf of one, and
              you believe that the copyrighted work has been copied in a way
              that constitutes copyright infringement, please submit your claim
              via email to jay@highlight.io, with the subject line: “Copyright
              Infringement” and include in your claim a detailed description of
              the alleged Infringement as detailed below, under “DMCA Notice and
              Procedure for Copyright Infringement Claims”
            </p>
            <p>
              You may be held accountable for damages (including costs and
              attorneys&apos; fees) for misrepresentation or bad-faith claims on
              the infringement of any Content found on and/or through Service on
              your copyright.
            </p>
            <p>
              <b>
                15. DMCA Notice and Procedure for Copyright Infringement Claims
              </b>
              <br />
              You may submit a notification pursuant to the Digital Millennium
              Copyright Act (DMCA) by providing our Copyright Agent with the
              following information in writing (see 17 U.S.C 512(c)(3) for
              further detail):
            </p>
            <p>
              1. an electronic or physical signature of the person authorized to
              act on behalf of the owner of the copyright&apos;s interest;
            </p>
            <p>
              2. a description of the copyrighted work that you claim has been
              infringed, including the URL (i.e., web page address) of the
              location where the copyrighted work exists or a copy of the
              copyrighted work;
            </p>
            <p>
              3. identification of the URL or other specific location on Service
              where the material that you claim is infringing is located;
            </p>
            <p>4. your address, telephone number, and email address;</p>
            <p>
              5. a statement by you that you have a good faith belief that the
              disputed use is not authorized by the copyright owner, its agent,
              or the law;
            </p>
            <p>
              6. a statement by you, made under penalty of perjury, that the
              above information in your notice is accurate and that you are the
              copyright owner or authorized to act on the copyright owner&apos;s
              behalf.
            </p>
            <p>
              You can contact our Copyright Agent via email at jay@highlight.io
            </p>
            <p>
              <b>16. Error Reporting and Feedback</b>
              <br />
              You may provide us directly at jay@highlight.io with information
              and feedback concerning errors, suggestions for improvements,
              ideas, problems, complaints, and other matters related to our
              Service (“Feedback”). You acknowledge and agree that: (i) you
              shall not retain, acquire or assert any intellectual property
              right or other right, title or interest in or to the Feedback;
              (ii) Company may have development ideas similar to the Feedback;
              (iii) Feedback does not contain confidential information or
              proprietary information from you or any third party; and (iv)
              Company is not under any obligation of confidentiality with
              respect to the Feedback. In the event the transfer of the
              ownership to the Feedback is not possible due to applicable
              mandatory laws, you grant Company and its affiliates an exclusive,
              transferable, irrevocable, free-of-charge, sub-licensable,
              unlimited and perpetual right to use (including copy, modify,
              create derivative works, publish, distribute and commercialize)
              Feedback in any manner and for any purpose.
            </p>
            <p>
              <b>17. Links To Other Web Sites</b>
              <br />
              Our Service may contain links to third party web sites or services
              that are not owned or controlled by Highlight Inc.
            </p>
            <p>
              Highlight Inc. has no control over, and assumes no responsibility
              for the content, privacy policies, or practices of any third party
              web sites or services. We do not warrant the offerings of any of
              these entities/individuals or their websites.
            </p>
            <p>
              YOU ACKNOWLEDGE AND AGREE THAT HIGHLIGHT INC. SHALL NOT BE
              RESPONSIBLE OR LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR
              LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE
              OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON
              OR THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.
            </p>
            <p>
              WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY
              POLICIES OF ANY THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.
            </p>
            <p>
              <b>18. Disclaimer Of Warranty</b>
              <br />
              THESE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS
              AVAILABLE” BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES
              OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR
              SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED
              THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES,
              THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT
              YOUR SOLE RISK.
            </p>
            <p>
              NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY
              WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS,
              SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE
              SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY NOR
              ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT THE
              SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH
              THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR
              UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES
              OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER
              HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS
              OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR
              EXPECTATIONS.
            </p>
            <p>
              COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER
              EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT
              LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT,
              AND FITNESS FOR PARTICULAR PURPOSE.
            </p>
            <p>
              THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE
              EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
            </p>
            <p>
              <b>19. Limitation Of Liability</b>
              <br />
              EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS,
              DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT,
              PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT
              ARISES (INCLUDING ATTORNEYS&apos; FEES AND ALL RELATED COSTS AND
              EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL,
              IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED),
              WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS
              ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT,
              INCLUDING WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR
              PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY
              YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR
              REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE
              POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE
              IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO
              THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO
              CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES.
              SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE,
              INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR
              EXCLUSION MAY NOT APPLY TO YOU.
            </p>
            <p>
              <b>20. Termination</b>
              <br />
              We may terminate or suspend your account and bar access to Service
              immediately, without prior notice or liability, under our sole
              discretion, for any reason whatsoever and without limitation,
              including but not limited to a breach of Terms.
            </p>
            <p>
              If you wish to terminate your account, you may simply discontinue
              using Service.
            </p>
            <p>
              All provisions of Terms which by their nature should survive
              termination shall survive termination, including, without
              limitation, ownership provisions, warranty disclaimers, indemnity
              and limitations of liability.
            </p>
            <p>
              <b>21. Governing Law</b>
              <br />
              These Terms shall be governed and construed in accordance with the
              laws of State of California without regard to its conflict of law
              provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will
              not be considered a waiver of those rights. If any provision of
              these Terms is held to be invalid or unenforceable by a court, the
              remaining provisions of these Terms will remain in effect. These
              Terms constitute the entire agreement between us regarding our
              Service and supersede and replace any prior agreements we might
              have had between us regarding Service.
            </p>
            <p>
              <b>22. Changes To Service</b>
              <br />
              We reserve the right to withdraw or amend our Service, and any
              service or material we provide via Service, in our sole discretion
              without notice. We will not be liable if for any reason all or any
              part of Service is unavailable at any time or for any period. From
              time to time, we may restrict access to some parts of Service, or
              the entire Service, to users, including registered users.
            </p>
            <p>
              <b>23. Amendments To Terms</b>
              <br />
              We may amend Terms at any time by posting the amended terms on
              this site. It is your responsibility to review these Terms
              periodically.
            </p>
            <p>
              Your continued use of the Platform following the posting of
              revised Terms means that you accept and agree to the changes. You
              are expected to check this page frequently so you are aware of any
              changes, as they are binding on you.
            </p>
            <p>
              By continuing to access or use our Service after any revisions
              become effective, you agree to be bound by the revised terms. If
              you do not agree to the new terms, you are no longer authorized to
              use Service.
            </p>
            <p>
              <b>24. Waiver And Severability</b>
              <br />
              No waiver by Company of any term or condition set forth in Terms
              shall be deemed a further or continuing waiver of such term or
              condition or a waiver of any other term or condition, and any
              failure of Company to assert a right or provision under Terms
              shall not constitute a waiver of such right or provision.
            </p>
            <p>
              If any provision of Terms is held by a court or other tribunal of
              competent jurisdiction to be invalid, illegal or unenforceable for
              any reason, such provision shall be eliminated or limited to the
              minimum extent such that the remaining provisions of Terms will
              continue in full force and effect.
            </p>
            <p>
              <b>25. Acknowledgement</b>
              <br />
              BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE
              THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY
              THEM.
            </p>
            <p>
              <b>26. Contact Us</b>
              <br />
              Please send your feedback, comments, requests for technical
              support:
              <br />
              By email: <a href="mailto:jay@highlight.io">jay@highlight.io</a>.
            </p>
          </div>
        </Section>

        <CallToAction />
      </main>
      <Footer />
    </>
  );
};

export default Terms;
