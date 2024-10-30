import { Outlet, useLocation, useNavigate } from "react-router-dom";
import classes from "./details-root-layout.module.css";
import { IoArrowBack } from "react-icons/io5";

const DetailsRootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, image } = location.state;

  return (
    <div className={classes.container}>
      <div
        onClick={() => navigate(-1)}
        className={classes["container__header"]}
      >
        <img
          className={classes["container__header--poster"]}
          src={image}
          alt={title}
        />
        <div>
          <h1 className={classes["container__header--title"]}>{title}</h1>
          <p className={classes["container__header--back"]}>
            <IoArrowBack />
            Back to main
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default DetailsRootLayout;
