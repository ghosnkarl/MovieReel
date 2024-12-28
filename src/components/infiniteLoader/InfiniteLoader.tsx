import { useInView } from 'react-intersection-observer';
import { ReactNode, useEffect } from 'react';
import LoadingIndicator from '@/components/ui/loadingSpinner/LoadingIndicator';

interface InfiniteLoaderProps {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  children: ReactNode;
}

const InfiniteLoader = ({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  children,
}: InfiniteLoaderProps) => {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div>
      {children}
      <div
        style={{
          alignSelf: 'center',
          justifySelf: 'center',
          marginTop: '1.2rem',
        }}
        ref={ref}
      >
        {isFetchingNextPage && <LoadingIndicator />}
      </div>
    </div>
  );
};

export default InfiniteLoader;
