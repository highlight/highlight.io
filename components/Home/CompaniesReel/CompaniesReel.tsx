import React from 'react';

import styles from '../../Home/Home.module.scss';
import Image from 'next/image';
import Mona from '../../../public/images/companies/mona.png';
import Quorum from '../../../public/images/companies/quorum.png';
import Airplane from '../../../public/images/companies/airplane.png';
import Basedash from '../../../public/images/companies/basedash.png';
import Knock from '../../../public/images/companies/knock.png';
import Pipe from '../../../public/images/companies/pipe.png';
import Hightouch from '../../../public/images/companies/hightouch.png';
import Impira from '../../../public/images/companies/impira.png';
import Porter from '../../../public/images/companies/porter.png';
import Portal from '../../../public/images/companies/portal.png';
import Quickcard from '../../../public/images/companies/quickcard.png';
import Districtzero from '../../../public/images/companies/districtzero.png';
import Commandbar from '../../../public/images/companies/commandbar.png';
import Tyltgo from '../../../public/images/companies/tyltgo.png';

export const CompaniesReel = () => {
  return (
    <div className={styles.customerReel}>
      <div className={styles.sectionSubtitle}>
        Empowering Forward-Looking Companies
      </div>
      <div className={styles.companies}>
        <Image src={Mona} alt="" />
        <Image src={Quorum} alt="" />
        <Image src={Airplane} alt="" />
        <Image src={Basedash} alt="" />
        <Image src={Knock} alt="" />
        <Image src={Pipe} alt="" />
        <Image src={Hightouch} alt="" />
        <Image src={Impira} alt="" />
        <Image src={Porter} alt="" />
        <Image src={Portal} alt="" />
        <Image src={Quickcard} alt="" />
        <Image src={Districtzero} alt="" />
        <Image src={Commandbar} alt="" />
        <Image src={Tyltgo} alt="" />
      </div>
    </div>
  );
};
