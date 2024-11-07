import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ui/ScrollToTop';

export default function RootLayout() {
  return (
    <>
      <Navigation />
      <main>
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </main>
    </>
  );
}
