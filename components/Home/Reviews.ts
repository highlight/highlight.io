import { StaticImageData } from 'next/image';
import Basedash from '../../public/images/companies/basedash.png';
import Knock from '../../public/images/companies/knock.png';
import Impira from '../../public/images/companies/impira.png';
import Secoda from '../../public/images/companies/secoda.svg';
import Portal from '../../public/images/companies/portal.png';
import Mage from '../../public/images/companies/mage.png';
import Airplane from '../../public/images/companies/airplane.png';

import BasedashAvatar from '../../public/images/avatars/basedash.jpg';
import KnockAvatar from '../../public/images/avatars/knock.jpg';
import ImpiraAvatar from '../../public/images/avatars/impira.jpg';
import SecodaAvatar from '../../public/images/avatars/secoda.jpg';
import PortalAvatar from '../../public/images/avatars/portal.jpg';
import MageAvatar from '../../public/images/avatars/mage.jpg';
import AirplaneAvatar from '../../public/images/avatars/airplane.jpg';

export interface Review {
  companyLogo: StaticImageData;
  text: string;
  author: {
    image: StaticImageData;
    name: string;
    role: string;
  };
}

export const REVIEWS: Review[] = [
  {
    companyLogo: Basedash,
    text: `Highlight helps us catch bugs that would otherwise go undetected and makes it easy to replicate and debug them.`,
    author: {
      image: BasedashAvatar,
      name: 'Max Musing',
      role: 'Founder & CEO',
    },
  },
  {
    companyLogo: Impira,
    text: `Before Highlight, I was flying blind, but now I can see exactly where users are succeeding, failing, and running into issues.`,
    author: {
      image: ImpiraAvatar,
      name: 'Lorilyn McCue',
      role: 'Head of Product',
    },
  },
  {
    companyLogo: Mage,
    text: `Highlight weaves together the incredible, varied, and complex interactions of our users into something understandable and actionable.`,
    author: {
      image: MageAvatar,
      name: 'Kai Hess',
      role: 'Founding Product Designer',
    },
  },
  {
    companyLogo: Knock,
    text: `I love Highlight because not only does it help me debug more quickly, but it gives me insight into how customers are actually using our product.`,
    author: {
      image: KnockAvatar,
      name: 'Meryl Dakin',
      role: 'Founding Software Engineer',
    },
  },
  {
    companyLogo: Airplane,
    text: `Highlight gives us valuable ground truth, in a secure and privacy-aware manner, when we're working on improving onboarding flows and understanding feature usage.`,
    author: {
      image: AirplaneAvatar,
      name: 'Josh Ma',
      role: 'Co-founder & CTO',
    },
  },
  {
    companyLogo: Portal,
    text: `Highlight has helped us win over several customers by making it possible for us to provide hands-on support, based on a detailed understanding of what each user was doing.`,
    author: {
      image: PortalAvatar,
      name: 'Neil Raina',
      role: 'CTO',
    },
  },
  {
    companyLogo: Secoda,
    text: `As a PLG company, Highlight gives us complete visibility on how customers are using our app and what parts of the journey are confusing or tough to get through.`,
    author: {
      image: SecodaAvatar,
      name: 'Etai Mizrahi',
      role: 'Co-founder',
    },
  },
];
