import { ImageResponse } from '@vercel/og';
import { NextRequest, URLPattern } from 'next/server';
import { gql } from 'graphql-request';
import { Post } from '../../../../components/Blog/BlogPost/BlogPost';
import { Buffer } from 'buffer';
import { font, fontLight, hero } from '../util';
import { GraphQLRequest } from '../../../util';

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
        profilePhoto {
          url
        }
      }
    }
  }
`;

export default async function handler(req: NextRequest) {
  const fontData = await font;
  const fontLightData = await fontLight;
  const heroData = await hero;
  const heroBase64 = Buffer.from(heroData).toString('base64');
  const slug = new URLPattern({ pathname: '/api/og/blog/:slug' }).exec(req.url)
    ?.pathname.groups.slug;
  const post = (await GraphQLRequest(QUERY, { slug }, false)).post as
    | Post
    | undefined;

  let profilePic: string = '';
  if (post?.author?.profilePhoto.url) {
    const req = await fetch(post?.author?.profilePhoto.url);
    if (
      new Set<string>(['image/jpeg', 'image/png']).has(
        req.headers.get('content-type') || ''
      )
    ) {
      profilePic = post?.author?.profilePhoto.url;
    }
  }

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
            viewBox="0 0 68 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="34" cy="34" r="34" fill="#6C37F4" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.375 19.125C21.0278 19.125 19.125 21.0278 19.125 23.375V44.625C19.125 46.9722 21.0278 48.875 23.375 48.875H36.125L25.5 19.125H23.375ZM31.875 19.125L42.5 48.875H44.625C46.9722 48.875 48.875 46.9722 48.875 44.625V23.375C48.875 21.0278 46.9722 19.125 44.625 19.125H31.875Z"
              fill="white"
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
          <div tw={'flex flex-row items-center'}>
            <div tw={'flex flex-col'}>
              {profilePic && (
                <span tw={'pr-4'}>
                  <img
                    src={profilePic}
                    width={50}
                    height={50}
                    alt={'author profile picture'}
                    tw={'rounded-3xl'}
                  />
                </span>
              )}
            </div>
            <div tw={'flex flex-col'}>
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
          </div>
        </div>
        <img
          alt={'highlight hero'}
          style={{
            position: 'absolute',
            top: 0,
            left: 550,
          }}
          width={650}
          height={650}
          src={`data:image/png;base64,${heroBase64}`}
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
