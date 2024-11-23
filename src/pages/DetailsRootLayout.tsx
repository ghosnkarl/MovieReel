import { Outlet, useLocation } from 'react-router-dom';
import classes from '../styles/details-root-layout.module.css';
import ScrollToTop from '../components/ui/ScrollToTop';

const DetailsRootLayout = () => {
  const location = useLocation();
  const { title, image } = location.state;

  return (
    <ScrollToTop>
      <div className={classes.container}>
        <div className={classes['container__header']}>
          <img
            className={classes['container__header--poster']}
            src={image}
            alt={title}
          />
          <div>
            <h1 className={classes['container__header--title']}>{title}</h1>
            <p className={classes['container__header--back']}>Credits</p>
          </div>
        </div>
        <Outlet />
      </div>
    </ScrollToTop>
  );
};

export default DetailsRootLayout;
