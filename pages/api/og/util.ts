export const font = fetch(
  // @ts-ignore
  new URL('../../../styles/font/Poppins-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const fontLight = fetch(
  // @ts-ignore
  new URL('../../../styles/font/Poppins-Light.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export const hero = fetch(
  // @ts-ignore
  new URL('../../../public/images/hero.png', import.meta.url)
).then((res) => res.arrayBuffer());
