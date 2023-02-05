import Image from 'next/image';
import styles from './Home.module.scss';
import productStyles from '../Products/Products.module.scss'
import classNames from 'classnames';
import { Typography } from '../common/Typography/Typography';
import { PrimaryButton } from '../common/Buttons/PrimaryButton';


//Component for the image/text row for the footer of the product page
//invert puts the image on the right side of the text
const LandingInfoRow = ({
  title,
  desc,
  link,
  linkText,
  invert,
  imgSrc,
}: {
  title: string;
  desc: string;
  link: string;
  linkText: string;
  invert?: boolean;
  imgSrc: any;
}) => {
  return (
    <div className={styles.landingInfoRow}>
      <div className={`${invert ? "lg:hidden" : ""} flex justify-center px-5 h-[200px] lg:h-auto lg:w-[570px]`}>
        <Image src={imgSrc} alt="" />
      </div>
      <div className="flex md:hidden w-full h-[1px] bg-divider-on-dark"> </div>
      <div className="lg:w-1/2 px-5 text-left lg:text-left">
        <h3 className={productStyles.infoTitle}>
          {title}
        </h3>
        <Typography type="copy2" onDark>
          <p className="text-color-darker-copy-on-dark">
            {desc}
          </p>
        </Typography>
        <div className="flex justify-start">
          <PrimaryButton href={link} className={classNames(productStyles.hollowButton, productStyles.docsButton, "mt-5")}>
            <Typography type="copy2" emphasis={true}>{linkText}</Typography>
          </PrimaryButton>
        </div>
      </div>
      <div className={`${invert ? "lg:flex" : ""} hidden justify-center lg:w-[570px]`}>
        <Image src={imgSrc} alt="" />
      </div>
    </div>
  )
}

export default LandingInfoRow;