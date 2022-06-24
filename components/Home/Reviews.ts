import { StaticImageData } from 'next/image';
import Mona from '../../public/images/companies/mona.png';
import Airplane from '../../public/images/companies/airplane.png';
import Basedash from '../../public/images/companies/basedash.png';
import Knock from '../../public/images/companies/knock.png';
import Pipe from '../../public/images/companies/pipe.png';
import Impira from '../../public/images/companies/impira.png';
import Porter from '../../public/images/companies/porter.png';
import Portal from '../../public/images/companies/portal.png';
import Quickcard from '../../public/images/companies/quickcard.png';
import Districtzero from '../../public/images/companies/districtzero.png';
import Commandbar from '../../public/images/companies/commandbar.png';
import Tyltgo from '../../public/images/companies/tyltgo.png';
import Cabal from '../../public/images/companies/cabal.svg';
import Journey from '../../public/images/companies/journey.png';
import Dripos from '../../public/images/companies/dripos.png';
import Mage from '../../public/images/companies/mage.png';
import Avatar from '../../public/images/john.jpg';

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
    text: `Highlight helps us find and fix hard to crack bugs and is a complimentary tool to our existing dev ops infrastructure. I'd recommend Highlight to any team that wants to ship fast.`,
    author: {
      image: Avatar,
      name: 'John Dee',
      role: 'Engineer',
    },
  },
  {
    companyLogo: Mona,
    text: `Highlight helps us find and fix hard to crack bugs and is a complimentary tool to our existing dev ops infrastructure. I'd recommend Highlight to any team that wants to ship fast.`,
    author: {
      image: Avatar,
      name: 'John Dee',
      role: 'Engineer',
    },
  },
  {
    companyLogo: Mage,
    text: `Highlight helps us find and fix hard to crack bugs and is a complimentary tool to our existing dev ops infrastructure. I'd recommend Highlight to any team that wants to ship fast.`,
    author: {
      image: Avatar,
      name: 'John Dee',
      role: 'Engineer',
    },
  },
  {
    companyLogo: Pipe,
    text: `Highlight helps us find and fix hard to crack bugs and is a complimentary tool to our existing dev ops infrastructure. I'd recommend Highlight to any team that wants to ship fast.`,
    author: {
      image: Avatar,
      name: 'John Dee',
      role: 'Engineer',
    },
  },
  {
    companyLogo: Impira,
    text: `Highlight helps us find and fix hard to crack bugs and is a complimentary tool to our existing dev ops infrastructure. I'd recommend Highlight to any team that wants to ship fast.`,
    author: {
      image: Avatar,
      name: 'John Dee',
      role: 'Engineer',
    },
  },
];
