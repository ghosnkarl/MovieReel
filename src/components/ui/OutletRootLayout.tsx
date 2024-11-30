import { Outlet } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

const OutletRootLayout = () => {
  return (
    <ScrollToTop>
      <Outlet />
    </ScrollToTop>
  );
};

export default OutletRootLayout;
