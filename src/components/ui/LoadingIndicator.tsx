import { CircularProgress } from '@mui/material';

export default function LoadingIndicator() {
  return (
    <CircularProgress
      sx={{ color: '#ffffff', justifySelf: 'center', alignSelf: 'center' }}
      size={60}
    />
  );
}
