import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ui/ScrollToTop';

export default function RootLayout() {
  return (
    <>
      <ScrollToTop>
        <Navigation />
        <main>
          <Outlet />
        </main>
      </ScrollToTop>
    </>
  );
}
