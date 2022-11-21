import { ImageResponse } from '@vercel/og';
import { NextRequest, URLPattern } from 'next/server';
import { font, fontLight, hero } from '../util';
import 'fs';
import path from 'path';
import { getGithubDoc } from '../../docs/github';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const fontData = await font;
  const fontLightData = await fontLight;
  const heroData = await hero;
  const heroBase64 = btoa(String.fromCharCode(...new Uint8Array(heroData)));

  const doc = new URLPattern({ pathname: '/api/og/doc/:doc*' }).exec(req.url)
    ?.pathname.groups.doc;

  const { meta } = await getGithubDoc(doc || 'index');

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
        <div tw="flex flex-col h-full w-1/2 font-bold text-white text-left justify-between p-12">
          <svg
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
          <div tw="flex flex-col">
            <span
              style={{
                color: '#EBFF5E',
                fontSize: 18,
                lineHeight: 4,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Highlight Docs
            </span>
            <span tw="text-4xl">{meta.title}</span>
            <span
              style={{
                color: '#DFDFDF',
                fontSize: 16,
                fontFamily: '"PoppinsLight"',
              }}
            >
              Stop wasting effort trying to track down and reproduce bugs.
              Through session replay, Highlight shows you exactly how and when
              your bugs happen. Get started today!
            </span>
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
