import { Outlet } from 'react-router-dom';
import Navigation from './navigation/Navigation';
import ScrollToTop from './ScrollToTop';
import Footer from './footer/Footer';

export default function RootLayout() {
  return (
    <div>
      <Navigation />
      <main className='page-container'>
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </main>
      <Footer />
    </div>
  );
}
