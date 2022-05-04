import React from 'react';

import styles from '../../Home/Home.module.scss';
import Image from 'next/image';
import Mona from '../../../public/images/companies/mona.png';
import Airplane from '../../../public/images/companies/airplane.png';
import Basedash from '../../../public/images/companies/basedash.png';
import Knock from '../../../public/images/companies/knock.png';
import Pipe from '../../../public/images/companies/pipe.png';
import Impira from '../../../public/images/companies/impira.png';
import Porter from '../../../public/images/companies/porter.png';
import Portal from '../../../public/images/companies/portal.png';
import Quickcard from '../../../public/images/companies/quickcard.png';
import Districtzero from '../../../public/images/companies/districtzero.png';
import Commandbar from '../../../public/images/companies/commandbar.png';
import Tyltgo from '../../../public/images/companies/tyltgo.png';
import Cabal from '../../../public/images/companies/cabal.svg';
import Journey from '../../../public/images/companies/journey.png';
import Dripos from '../../../public/images/companies/dripos.png';
import Mage from '../../../public/images/companies/mage.png';
import Link from 'next/link';
import classNames from 'classnames';

export const CompaniesReel = () => {
  return (
    <div className={styles.customerReel}>
      <div className={styles.companies}>
        <Image src={Cabal} alt="" />
        <Image src={Mona} alt="" />
        <Image src={Airplane} alt="" />
        <Image src={Basedash} alt="" />
        <Image src={Knock} alt="" className={styles.scaleHeight} />
        <Image src={Pipe} alt="" className={styles.scaleHeight} />
        <Image src={Impira} alt="" className={styles.scaleHeight} />
        <Image src={Porter} alt="" className={styles.scaleHeight} />
        <Image src={Portal} alt="" className={styles.scaleHeight} />
        <Image src={Commandbar} alt="" className={styles.scaleHeight} />
        <Image src={Quickcard} alt="" className={styles.scaleHeight} />
        <Image src={Districtzero} alt="" className={styles.scaleHeight} />
        <Image src={Tyltgo} alt="" className={styles.scaleHeight} />
        <Image src={Dripos} alt="" className={styles.scaleHeight} />
        <Image src={Mage} alt="" className={styles.scaleHeight} />
        <Image src={Journey} alt="" className={styles.scaleHeight} />
      </div>
      <div className={styles.anchorTitle}>
        <p className={classNames(styles.bodySmall, styles.customerCopy)}>
          Highlight powers forward-thinking companies.
          <Link href={'/customers'}>
            <a className={styles.buttonArrow}>
              Our Customers
              <span className={styles.arrow}>→</span>
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};
