const date = (date: string | null | undefined) => {
  return date
    ? new Date(date).toLocaleDateString('en-US', {
        dateStyle: 'medium',
      })
    : 'Unknown';
};

const year = (date: string) => new Date(date).getFullYear();

const years = (start: string, end: string) => {
  const startYear = new Date(start).getFullYear();
  const endYear = new Date(end).getFullYear();
  return `${startYear} - ${endYear}`;
};

export const format = { date, year, years };
