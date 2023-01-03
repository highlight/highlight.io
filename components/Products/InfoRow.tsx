import Image from 'next/image';
import styles from './Products.module.scss'
import classNames from 'classnames';
import { Typography } from '../common/Typography/Typography';
import { PrimaryButton } from '../../components/common/Buttons/PrimaryButton';


//Component for the image/text row for the footer of the product page
//invert puts the image on the right side of the text
const InfoRow = ({
  title,
  desc,
  link,
  invert,
  imgSrc,
}: {
  title: string;
  desc: string;
  link: string;
  invert?: boolean;
  imgSrc: any;
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:mt-32 xl:gap-32">
      <div className={`${invert ? "lg:hidden " : ""} flex justify-center lg:w-[570px]`}>
        <Image src={imgSrc} alt="" />
      </div>
      <div className="lg:w-1/2 text-center lg:text-left">
        <h3 className={styles.infoTitle}>
          {title}
        </h3>
        <Typography type="copy2" onDark>
          <p className="text-color-darker-copy-on-dark">
            {desc}
          </p>
        </Typography>
        <div className="flex justify-center lg:justify-start">
          <PrimaryButton href={link} className={classNames(styles.hollowButton, "mt-5")}>
            <Typography type="copy2" emphasis={true}>
              Read our docs
            </Typography>
          </PrimaryButton>
        </div>
      </div>
      <div className={`${invert ? "lg:flex" : ""} hidden justify-center lg:w-[570px]`}>
        <Image src={imgSrc} alt="" />
      </div>
    </div>
  )
}

export default InfoRow;