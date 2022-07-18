import React, { useState } from 'react';

import styles from '../../Home/Home.module.scss';
import VideoThumbnail from '../../../public/images/thumbnail.png';
import Jay from '../../../public/images/jay.png';
import PlayButton from '../../../public/images/playButton.svg';
import classNames from 'classnames';
import Image from 'next/image';
import { Typography } from '../../common/Typography/Typography';

export const HeroVideo = () => {
  const [hideVideo, setHideVideo] = useState(true);
  return (
    <div
      className={classNames(
        styles.anchorImage,
        styles.heroImage,
        styles.imageInner
      )}
    >
      <div
        className={classNames(styles.videoModal, {
          [styles.hideVideo]: hideVideo,
        })}
      >
        <div
          className={styles.modalBg}
          onClick={() => setHideVideo(true)}
        ></div>
        <div>
          {!hideVideo && (
            <video controls autoPlay>
              <source src="/images/herovideo.mp4" type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <div className={styles.playButton} onClick={() => setHideVideo(false)}>
        <div className={styles.jayImage}>
          <Image src={Jay} alt="Jay" />
        </div>
        <div className={styles.playButtonIcon}>
          <Image src={PlayButton} alt="" />
        </div>
        <div className={styles.playCard}>
          <Typography type="copy1" emphasis>
            Watch Jay demo Highlight
          </Typography>
          <Typography type="copy2">Under 2 minutes</Typography>
        </div>
      </div>
      <div className={styles.thumbnail} onClick={() => setHideVideo(false)}>
        <Image src={VideoThumbnail} alt="" />
      </div>
    </div>
  );
};
