import { Outlet } from 'react-router-dom';
import Navigation from './components/ui/navigation/Navigation';
import ScrollToTop from './components/ui/ScrollToTop';
import Footer from './components/ui/footer/Footer';

export default function RootLayout() {
  return (
    <div>
      <Navigation />
      <main style={{ minHeight: '100vh' }}>
        <ScrollToTop>
          <Outlet />
        </ScrollToTop>
      </main>
      <Footer />
    </div>
  );
}
