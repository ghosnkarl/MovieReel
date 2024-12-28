import LoadingSpinner from './loadingSpinner/LoadingSpinner';

export default function LoadingIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingSpinner />
    </div>
  );
}
