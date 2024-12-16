const discoverReleaseDates = (
  isMovie: boolean,
  start: number,
  startType: 'days' | 'month',
  end: number,
  endType: 'days' | 'month'
): string => {
  const addTime = (date: Date, value: number, type: 'days' | 'month') => {
    const newDate = new Date(date);
    if (type === 'days') {
      newDate.setDate(newDate.getDate() + value);
    } else if (type === 'month') {
      newDate.setMonth(newDate.getMonth() + value);
    }
    return newDate;
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const today = new Date();
  const date_gte = formatDate(addTime(today, start, startType));
  const date_lte = formatDate(addTime(today, end, endType));

  const date_gte_key = isMovie ? 'primary_release_date.gte' : 'air_date.gte';
  const date_lte_key = isMovie ? 'primary_release_date.lte' : 'air_date.lte';

  const dates = {
    [date_gte_key]: date_gte,
    [date_lte_key]: date_lte,
  };

  return Object.entries(dates)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

export const upComingDates = discoverReleaseDates(true, 5, 'days', 26, 'days');
export const nowPlayingDates = discoverReleaseDates(
  true,
  -1,
  'month',
  5,
  'days'
);
export const airingTodayDates = discoverReleaseDates(
  false,
  0,
  'days',
  0,
  'days'
);
export const onAirDates = discoverReleaseDates(false, 0, 'days', 7, 'days');
