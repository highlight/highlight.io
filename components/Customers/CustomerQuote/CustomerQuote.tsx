import Image from 'next/image';
import style from './CustomerQuote.module.scss';
import { Typography } from '../../common/Typography/Typography';

export const CustomerQuote = ({
  content,
  author,
  authorAvatar,
  role,
}: {
  content: string;
  author: string;
  authorAvatar: string;
  role: string;
}) => (
  <div className={style.customerQuote}>
    <blockquote>
      <span
        className={style.quote}
        style={{ position: 'absolute', top: '24px', left: '14px' }}
      >
        “
      </span>
      <Typography type="copy2" emphasis>
        {content}
      </Typography>
      <span
        className={style.quote}
        style={{
          marginLeft: '6px',
        }}
      >
        ”
      </span>
    </blockquote>
    <div className={style.quoteAuthor}>
      <Image
        className={style.avatar}
        src={authorAvatar}
        alt="Author picture"
        width="48px"
        height="48px"
      />
      <Typography type="copy3" emphasis>
        {author},
      </Typography>
      <Typography type="copy3">{role}</Typography>
    </div>
  </div>
);
