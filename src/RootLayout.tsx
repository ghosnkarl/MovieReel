import { Outlet } from 'react-router-dom';
import Navigation from './components/ui/navigation/Navigation';
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
