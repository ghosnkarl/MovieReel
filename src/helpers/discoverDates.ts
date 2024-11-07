import { discoverReleaseDates } from './discoverParams';

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
