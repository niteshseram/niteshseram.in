const postDateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** One date format across lists, article headers, server rendering, and clients. */
export function formatPostDate(value: string | Date): string {
  const parts = postDateFormatter.formatToParts(new Date(value));
  const day = parts.find((part) => part.type === 'day')?.value;
  const month = parts.find((part) => part.type === 'month')?.value;
  const year = parts.find((part) => part.type === 'year')?.value;
  return `${day} ${month} ${year}`;
}
