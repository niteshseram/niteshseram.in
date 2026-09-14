/** Balance whole words across lines without shortening the article's title. */
export function getOgTitleLayout(title: string) {
  const words = title.trim().split(/\s+/u);
  const normalizedTitle = words.join(' ');
  const lineCount = Math.min(
    words.length,
    Math.max(1, Math.ceil(normalizedTitle.length / 30)),
  );
  const lines: string[] = [];
  let wordIndex = 0;

  for (let lineIndex = 0; lineIndex < lineCount; lineIndex++) {
    const remainingLines = lineCount - lineIndex;
    const remainingText = words.slice(wordIndex).join(' ');
    const targetLength = remainingText.length / remainingLines;
    let line = words[wordIndex++];

    while (wordIndex < words.length - (remainingLines - 1)) {
      const candidate = `${line} ${words[wordIndex]}`;
      if (
        remainingLines > 1 &&
        Math.abs(candidate.length - targetLength) >
          Math.abs(line.length - targetLength)
      )
        break;
      line = candidate;
      wordIndex++;
    }
    lines.push(line);
  }

  const preferredSize = lineCount <= 2 ? 76 : 64;
  const longestLine = Math.max(...lines.map((line) => line.length));
  const fontSize = Math.floor(
    Math.min(
      preferredSize,
      300 / (lineCount * 1.13),
      (preferredSize * 28) / Math.max(28, longestLine),
    ),
  );

  return { lines, fontSize };
}
