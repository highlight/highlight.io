import { ImageResponse } from '@vercel/og';
import { NextRequest, URLPattern } from 'next/server';
import { logoOnDark, bug2, font, fontLight, bug1 } from '../util';
import 'fs';
import path from 'path';
import { getGithubDoc } from '../../docs/github';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const fontData = await font;
  const fontLightData = await fontLight;
  const logoData = await logoOnDark;
  const logoBase64 = btoa(
    new Uint8Array(logoData).reduce(function (p, c) {
      return p + String.fromCharCode(c);
    }, '')
  );
  const bug1Data = await bug1;
  const bug1Base64 = btoa(
    new Uint8Array(bug1Data).reduce(function (p, c) {
      return p + String.fromCharCode(c);
    }, '')
  );
  const bug2Data = await bug2;
  const bug2Base64 = btoa(
    new Uint8Array(bug2Data).reduce(function (p, c) {
      return p + String.fromCharCode(c);
    }, '')
  );
  const doc = new URLPattern({ pathname: '/api/og/doc/:doc*' }).exec(req.url)
    ?.pathname.groups.doc;

  const d = await getGithubDoc(doc || 'index');

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0D0225',
        }}
      >
        <img
          alt={'logo'}
          style={{
            marginBottom: 56,
          }}
          width={150}
          height={150}
          src={`data:image/png;base64,${logoBase64}`}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
          <div style={{ marginBottom: 20, fontSize: 45, fontFamily: 'PoppinsLight', color: '#dfdfdf', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Docs / {"Hello World"}
          </div>
          <div style={{ fontSize: 75, fontFamily: 'Poppins', color: 'white', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Grouping Errors
          </div>

        </div>
        <img
          alt={'bug1'}
          style={{
            position: 'absolute',
            top: 50,
            left: 80,
          }}
          width={207.98 * 1.1}
          height={255.91 * 1.1}
          src={`data:image/png;base64,${bug1Base64}`}
        />
        <img
          alt={'bug2'}
          style={{
            position: 'absolute',
            top: 30,
            left: 830,
          }}
          width={308.49 * 1.2}
          height={235.58 * 1.2}
          src={`data:image/png;base64,${bug2Base64}`}
        />
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
