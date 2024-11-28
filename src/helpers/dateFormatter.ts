import moment from 'moment';

export const formatDate = (date: string | null) => {
  return date ? moment(date).format('MMM DD, YYYY') : 'Unknown';
};
