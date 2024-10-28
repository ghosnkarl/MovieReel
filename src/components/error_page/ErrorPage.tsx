import { useRouteError, isRouteErrorResponse, NavLink } from "react-router-dom";
import Navigation from "../../pages/navigation/Navigation";
import classes from "./error-page.module.css";

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
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <>
      <Navigation />
      <div className={classes.container}>
        <h1>Oops! An error Occured!</h1>
        <h2>{errorMessage}</h2>
        <NavLink to="/" className="btn">
          Home Page
        </NavLink>
      </div>
    </>
  );
};

export default ErrorPage;
