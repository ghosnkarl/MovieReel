import { Outlet } from 'react-router-dom';
import ScrollToTop from './ui/ScrollToTop';

const OutletRootLayout = () => {
  return (
    <ScrollToTop>
      <Outlet />
    </ScrollToTop>
  );
};

export default OutletRootLayout;
