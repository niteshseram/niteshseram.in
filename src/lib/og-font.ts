export async function loadGoogleFont(
  family: string,
  weight: number,
  style: 'normal' | 'italic' = 'normal',
) {
  const params = new URLSearchParams({
    family:
      style === 'italic'
        ? `${family}:ital,wght@1,${weight}`
        : `${family}:wght@${weight}`,
  });
  const cssUrl = `https://fonts.googleapis.com/css2?${params.toString()}`;
  const css = await fetch(cssUrl).then((res) => res.text());
  const matches = [
    ...css.matchAll(
      /src: url\((.+?)\) format\(['"](?:opentype|truetype)['"]\)/g,
    ),
  ];
  if (matches.length === 0) {
    throw new Error(`Font not found: ${family} ${weight} ${style}`);
  }
  return fetch(matches[matches.length - 1][1]).then((res) => res.arrayBuffer());
}
