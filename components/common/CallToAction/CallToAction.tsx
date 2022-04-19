import React from 'react';
import { ButtonProps } from 'antd';
import classNames from 'classnames';

import styles from '../../Home/Home.module.scss';
import { Section } from '../Section/Section';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import CTABg from '../../../public/images/CTABg';
import { CodeBlock } from '../CodeBlock/CodeBlock';

export const CallToAction = () => {
  return (
    <Section>
      <div className={styles.callToActionBackground}>
        <div className={styles.ctaBg}>
          <CTABg />
        </div>
        <div className={classNames(styles.anchorTitle, styles.ctaContainer)}>
          <div className={styles.sectionSubtitle}>Try Highlight Today</div>
          <h2>Get the visibility you need</h2>
          <p className={classNames(styles.bodyLarge, styles.anchorSmall)}>
            With powerful session replay and monitoring, Highlight gives you the
            visibility you need.
          </p>
          <div>
            <CodeBlock
              text={`npm install highlight.run`}
              language="typescript"
              showLineNumbers={false}
            />
          </div>
          <div
            className={classNames(
              styles.buttonContainer,
              styles.tryButtonContainer
            )}
          >
            <PrimaryButton href="https://app.highlight.run/?sign_up=1">
              Get Started For Free
            </PrimaryButton>
            <SecondaryButton href="https://calendly.com/jaykhatri/highlight-demo-call">
              Request A Demo
            </SecondaryButton>
          </div>
        </div>
      </div>
    </Section>
  );
};
