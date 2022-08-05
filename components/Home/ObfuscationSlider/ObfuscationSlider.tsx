import React from 'react';
import Image from 'next/image';
import ReactCompareImage from 'react-compare-image';
import ObfuscatedText from '../../../public/images/obfuscatedText.svg';
import RegularText from '../../../public/images/regularText.svg';
import SecurityImage from '../../../public/images/safety-security-section.gif';

import styles from '../../Home/Home.module.scss';
import classNames from 'classnames';

export const ObfuscationSlider = () => {
  return (
    <div className={styles.obfuscation}>
      <ReactCompareImage
        leftImage={RegularText.src}
        rightImage={ObfuscatedText.src}
        sliderLineColor="#72E4FC"
        sliderLineWidth={3}
        handle={
          <div className={styles.obfuscationHandle}>
            <div className={styles.arrow1}></div>
            <div className={styles.arrow2}></div>
          </div>
        }
      />
      <div className={classNames(styles.obfuscationImage, styles.hideMobile)}>
        <Image src={SecurityImage} alt="" />
      </div>
    </div>
  );
};
