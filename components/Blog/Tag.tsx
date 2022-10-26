import classNames from 'classnames';
import Link from 'next/link';
import { HiCog, HiCollection, HiTag, HiTruck } from 'react-icons/hi';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { Typography } from '../common/Typography/Typography';
import { Post } from './BlogPost/BlogPost';

export type Tag = {
  name: string;
  slug: string;
  description?: string;
  posts: Post[];
};

// TODO(fabio) temporarily leads to /blog/posts but should lead to /blog
const getTagUrl = (slug: string) => `/blog/posts${slug && `?tag=` + slug}`;

function TagIcon({
  slug,
  className,
}: {
  slug: Tag['slug'];
  className?: string;
}) {
  const iconMap: Record<Tag['slug'], ReactElement> = {
    all: <HiCollection className={className} />,
    placeholder: <HiCog className={className} />,
    test: <HiTruck className={className} />,
  };

  return iconMap[slug] ?? <HiTag className={className} />;
}

export function PostTag({ name, slug }: Pick<Tag, 'name' | 'slug'>) {
  return (
    <Link href={getTagUrl(slug)}>
      <div className="rounded-full bg-divider-on-dark w-fit px-3 py-0.5 select-none cursor-pointer hover:bg-copy-on-light transition-colors active:bg-black active:transition-none capitalize text-copy-on-dark">
        <Typography type="copy4">{name}</Typography>
      </div>
    </Link>
  );
}

export function SidebarTag({
  name,
  slug,
}: {
  name: Tag['name'];
  slug: Tag['slug'];
  current?: boolean;
}) {
  return (
    <Link href={getTagUrl(slug)}>
      <div className="flex gap-[3px] items-center text-copy-on-dark h-[30px] select-none cursor-pointer transition-all active:transition-none group hover:bg-divider-on-dark/30 active:bg-dark-background pl-[3px]">
        <TagIcon
          slug={slug}
          className="transition-all text-copy-on-light group-hover:text-copy-on-dark"
        />{' '}
        <Typography
          type="copy3"
          className="transition-all opacity-70 group-hover:opacity-100"
        >
          {name}
        </Typography>
      </div>
    </Link>
  );
}

export function TagTab({
  name,
  slug,
  current,
}: {
  name: Tag['name'];
  slug: Tag['slug'];
  current?: boolean;
}) {
  const tabBaseStyle = classNames(
    'flex gap-2 flex-0 items-center h-[30px] select-none box-content cursor-pointer hover:opacity-100 transition-opacity active:opacity-50 active:transition-none leading-none px-1 pb-2 group border-b-2 border-0 border-solid'
  );

  const tabColorStyle = classNames(
    current
      ? 'text-highlight-yellow border-highlight-yellow'
      : 'text-copy-on-dark border-transparent'
  );

  return (
    <div className={classNames(tabBaseStyle, tabColorStyle)}>
      <span
        className={classNames(
          current
            ? 'text-highlight-yellow'
            : 'opacity-70 group-hover:opacity-100 transition-opacity',
          'mt-1'
        )}
      >
        <TagIcon slug={slug} />
      </span>

      <Typography type="copy2" className="w-max" emphasis={current}>
        {name}
      </Typography>
    </div>
  );
}
