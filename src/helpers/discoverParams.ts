import moment from 'moment';

export const discoverReleaseDates = (
  isMovie: boolean,
  start: number,
  startType: 'days' | 'month',
  end: number,
  endType: 'days' | 'month'
): string => {
  const date_gte = moment().add(start, startType).format('YYYY-MM-DD');
  const date_lte = moment().add(end, endType).format('YYYY-MM-DD');
  const date_gte_key = isMovie ? 'primary_release_date.gte' : 'air_date.gte';
  const date_lte_key = isMovie ? 'primary_release_date.lte' : 'air_date.lte';

  const dates = {
    [date_gte_key]: date_gte,
    [date_lte_key]: date_lte,
  };
  return Object.entries(dates).join('&').replace(/,/g, '=');
};
