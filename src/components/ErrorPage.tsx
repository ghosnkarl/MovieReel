import { useRouteError, isRouteErrorResponse, NavLink } from 'react-router-dom';
import classes from '../styles/error-page.module.css';
import Navigation from '../pages/navigation/Navigation';

const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage =
      error.status === 404
        ? "The page you're looking for is beyond our reach"
        : error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <>
      <Navigation />
      <div className={classes.error}>
        <h1 className={classes['error__title']}>Oops! An error Occured!</h1>
        <h2 className={classes['error__message']}>{errorMessage}</h2>
        <NavLink to='/' className='link--gradient link--discover'>
          Home Page
        </NavLink>
      </div>
    </>
  );
};

export default ErrorPage;
