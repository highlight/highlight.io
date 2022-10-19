import { ImageResponse } from '@vercel/og';
import { NextRequest, URLPattern } from 'next/server';
import { gql } from 'graphql-request';
import { graphcms } from '../../blog';
import { Post } from '../../../components/Blog/BlogPost/BlogPost';

export const config = {
  runtime: 'experimental-edge',
};

const QUERY = gql`
  query GetPost($slug: String!) {
    post(where: { slug: $slug }) {
      slug
      title
      author {
        firstName
        lastName
        title
        twitterLink
        linkedInLink
        githubLink
        personalWebsiteLink
        profilePhoto {
          url
        }
      }
    }
  }
`;

const font = fetch(
  // @ts-ignore
  new URL('../../../styles/font/Poppins-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

const fontLight = fetch(
  // @ts-ignore
  new URL('../../../styles/font/Poppins-Light.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const fontData = await font;
  const fontLightData = await fontLight;
  const url = new URL(req.url);
  const slug = new URLPattern({ pathname: '/api/blog-og/:slug' }).exec(req.url)
    ?.pathname.groups.slug;
  const post = (await graphcms.request(QUERY, { slug })).post as
    | Post
    | undefined;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          backgroundColor: '#0D0225',
        }}
      >
        <div tw="flex flex-col w-1/2 font-bold text-white text-left p-12">
          <svg
            style={{ marginBottom: 153 }}
            width="68"
            height="68"
            viewBox="0 0 224 224"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="112" cy="112" r="112" fill="white" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M77 63C69.268 63 63 69.268 63 77V147C63 154.732 69.268 161 77 161H119L84 63H77ZM105 63L140 161H147C154.732 161 161 154.732 161 147V77C161 69.268 154.732 63 147 63H105Z"
              fill="#6C37F4"
            />
          </svg>
          <span
            style={{
              color: '#EBFF5E',
              fontSize: 18,
              lineHeight: 4,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Highlight Blog Post
          </span>
          <span tw="text-4xl mb-12">{post?.title || slug}</span>
          <span>
            {post?.author?.firstName} {post?.author?.lastName}
          </span>
          <span
            style={{
              color: '#DFDFDF',
              fontSize: 16,
              fontFamily: '"PoppinsLight"',
            }}
          >
            {post?.author?.title}
          </span>
        </div>
        <img
          alt={'hero'}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          src={`${url.protocol}//${url.host}/images/hero.png`}
        ></img>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Poppins',
          data: fontData,
          weight: 600,
          style: 'normal',
        },
        {
          name: 'PoppinsLight',
          data: fontLightData,
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );
}
