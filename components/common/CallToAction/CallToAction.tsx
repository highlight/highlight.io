import React from 'react';
import classNames from 'classnames';

import styles from '../../Home/Home.module.scss';
import { Section } from '../Section/Section';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { SecondaryButton } from '../Buttons/SecondaryButton';

export const CallToAction = () => {
  return (
    <div className={styles.callToActionBackground}>
      <div className={classNames(styles.anchorTitle, styles.ctaContainer)}>
        <div className={styles.sectionSubtitle}>Try Highlight Today</div>
        <h2>Get the visibility you need</h2>
        <div
          className={classNames(
            styles.buttonContainer,
            styles.tryButtonContainer
          )}
        >
          <PrimaryButton href="https://app.highlight.run/?sign_up=1">
            Get started for free
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
