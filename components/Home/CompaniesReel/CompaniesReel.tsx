import React from 'react';

import styles from '../../Home/Home.module.scss';
import Image from 'next/image';
import Airplane from '../../../public/images/companies/airplane.png';
import Basedash from '../../../public/images/companies/basedash.png';
import Knock from '../../../public/images/companies/knock.png';
import Pipe from '../../../public/images/companies/pipe.png';
import Impira from '../../../public/images/companies/impira.png';
import Portal from '../../../public/images/companies/portal.png';
import Hightouch from '../../../public/images/companies/hightouch.png';
import Dripos from '../../../public/images/companies/dripos.png';
import Mage from '../../../public/images/companies/mage.png';
import Secoda from '../../../public/images/companies/secoda.svg';
import classNames from 'classnames';
import { Typography } from '../../common/Typography/Typography';

export const CompaniesReel = () => {
  return (
    <div className={styles.anchorFeature} id="customers">
      <div className={styles.anchorHead}>
        <h2>{`Our customers`}</h2>
        <Typography type="copy2">
          Highlight powers forward-thinking companies.
        </Typography>
      </div>
      <div className={styles.customerReel}>
        <div className={styles.companies}>
          <Image src={Pipe} alt="" className={styles.scaleHeight} />
          <Image src={Portal} alt="" className={styles.scaleHeight} />
          <Image src={Dripos} alt="" className={styles.scaleHeight} />
          <Image src={Knock} alt="" className={styles.scaleHeight} />
          <Image
            src={Hightouch}
            alt=""
            className={styles.scaleHeight}
            style={{ transform: 'scale(1.4)' }}
          />
          <Image src={Basedash} alt="" />
          <Image src={Impira} alt="" className={styles.scaleHeight} />
          <Image src={Mage} alt="" className={styles.scaleHeight} />
          <Image src={Airplane} alt="" className={styles.scaleHeight} />
          <div
            className={classNames(styles.tabletGraphic, styles.hideMobile)}
          ></div>
          <Image src={Secoda} alt="" className={styles.scaleHeight} />
        </div>
      </div>
    </div>
  );
};
