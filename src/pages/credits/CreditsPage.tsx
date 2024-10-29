import { useLocation, useNavigate } from "react-router-dom";
import classes from "./credits-page.module.css";
import { useState } from "react";

import { IoArrowBack } from "react-icons/io5";
import { CastInterface, CrewInterface } from "../../models/mediaModel";
import ListItem from "../../components/horizontal_list/ListItem";
import { getProfileImage } from "../../helpers/imageSizes";

const CreditsPage = () => {
  const location = useLocation();
  const { title, image, credits } = location.state;
  const navigate = useNavigate();
  let filteredCrewList: CrewInterface[] = [];

  let departmentsList: string[] = [];

  departmentsList = credits.crew.map((crew: CrewInterface) => crew.department);
  departmentsList = [...new Set(departmentsList)];
  filteredCrewList = [...credits.crew];

  const [selectedDepartment, setSelectedDepartment] = useState<string>(
    departmentsList[0]
  );

  const handleSelectDepartment = (department: string) => {
    setSelectedDepartment(department);
  };

  return (
    <div className={classes.container}>
      <div onClick={() => navigate(-1)} className={classes.header}>
        <img src={image} alt={title} />
        <div>
          <h1 className={classes["movie-title"]}>{title}</h1>
          <p>
            <IoArrowBack />
            Back to main
          </p>
        </div>
      </div>

      <h1>Cast</h1>
      <div className="flex--wrap-container">
        {credits.cast.map((cast: CastInterface) => (
          <ListItem
            key={cast.credit_id}
            link={`/people/${cast.id}`}
            image={getProfileImage(cast.profile_path, "w185")}
            title={cast.name}
            text={cast.character}
          />
        ))}
      </div>

      <h1>Crew</h1>
      <div className={classes["departments-container"]}>
        {departmentsList &&
          departmentsList.map((department) => (
            <button
              onClick={() => handleSelectDepartment(department)}
              key={department}
              className={`btn-department ${
                selectedDepartment === department ? "selected" : ""
              }`}
            >
              {department}
            </button>
          ))}
      </div>
      <div className="flex--wrap-container">
        {filteredCrewList
          .filter((item) => item.department === selectedDepartment)
          .map((crew) => (
            <ListItem
              key={crew.credit_id}
              link={`/people/${crew.id}`}
              image={getProfileImage(crew.profile_path, "w185")}
              title={crew.name}
              text={crew.job}
            />
          ))}
      </div>
    </div>
  );
};

export default CreditsPage;