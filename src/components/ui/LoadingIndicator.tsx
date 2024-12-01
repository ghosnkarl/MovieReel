import { CircularProgress } from '@mui/material';

export default function LoadingIndicator() {
  return (
    <CircularProgress
      sx={{ color: '#f97316', justifySelf: 'center', alignSelf: 'center' }}
      size={60}
    />
  );
}