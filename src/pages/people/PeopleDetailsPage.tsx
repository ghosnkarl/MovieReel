import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPeopleDetails } from "../../services/http";
import { getPosterImage, getProfileImage } from "../../helpers/imageSizes";
import classes from "./people-details.module.css";
import { useState } from "react";
import moment from "moment";
import ImageList from "../../components/images/ImageList";
import ListItem from "../../components/horizontal_list/ListItem";

const PeopleDetailsPage = () => {
  const params = useParams();
  const personId = params.personId;
  const [readMore, setReadMore] = useState(false);
  const [selectedCredit, setSelectedCredit] = useState<"cast" | "crew">("cast");

  const { data, isError, error, refetch } = useQuery({
    queryKey: ["people", personId],
    queryFn: () => fetchPeopleDetails(personId),
    retry: 1,
  });

  const toggleReadMore = () => {
    setReadMore((prevState) => !prevState);
  };

  if (!data) return;
  let profileList = [...data.images.profiles];
  if (profileList.length > 8) profileList = profileList.slice(0, 8);

  let profiles: { galleryImage: string; fullImage: string }[] = [];
  if (data?.images && data.images.profiles && data.images.profiles.length > 0)
    profiles = data.images.profiles.map((profile) => {
      return {
        galleryImage: getProfileImage(profile.file_path, "w185"),
        fullImage: getProfileImage(profile.file_path, "original"),
      };
    });

  const handleTabClick = (type: "cast" | "crew") => {
    setSelectedCredit(type);
  };

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        {data && (
          <img
            className={classes["profile-img"]}
            alt={data.name}
            src={getProfileImage(data.profile_path, "h632")}
          />
        )}

        <h2>Known For</h2>
        <p>{data?.known_for_department}</p>
        <h2>Birthday</h2>
        <p>
          {moment(data?.birthday).format("MMMM DD, YYYY")} (
          {moment().diff(data?.birthday, "years")} years old)
        </p>
        {data?.deathday && (
          <>
            <h2>Deathday</h2>
            <p>{moment(data?.deathday).format("MMMM DD, YYYY")}</p>
          </>
        )}

        <h2>Place of Birth</h2>
        <p>{data?.place_of_birth}</p>
      </div>
      <div className={classes["main-content"]}>
        <h1 className={classes.name}>{data?.name}</h1>
        <h2 className={classes.header}>Biography</h2>
        <p
          className={`${classes.biography} ${
            readMore ? "" : classes["read-more"]
          }`}
        >
          {data?.biography}
        </p>
        <button className={classes["btn-more"]} onClick={toggleReadMore}>
          <strong>Read More</strong>
        </button>

        {profileList && profileList.length > 0 && (
          <ImageList
            images={profiles}
            backdropList={profileList}
            title={data.name}
            image={getProfileImage(data.profile_path, "w185")}
          />
        )}

        <div className={classes["combined-credits"]}>
          <h2 className={classes.header}>Movies &amp; TV Shows</h2>
          <menu className="tabs">
            <li>
              <button
                onClick={() => handleTabClick("cast")}
                className={selectedCredit === "cast" ? "selected" : ""}
              >
                Cast
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabClick("crew")}
                className={selectedCredit === "crew" ? "selected" : ""}
              >
                Crew
              </button>
            </li>
          </menu>

          {selectedCredit === "cast" && (
            <div className="flex--wrap-container">
              {data.combined_credits.cast.map((castMedia) => (
                <ListItem
                  key={castMedia.credit_id}
                  link="/"
                  title={
                    castMedia.media_type === "movie"
                      ? castMedia.title!
                      : castMedia.name!
                  }
                  image={getPosterImage(castMedia.poster_path, "w342")}
                  text={castMedia.character}
                />
              ))}
            </div>
          )}
          {selectedCredit === "crew" && (
            <div className="flex--wrap-container">
              {data.combined_credits.crew.map((crewMedia) => (
                <ListItem
                  key={crewMedia.credit_id}
                  link="/"
                  title={
                    crewMedia.media_type === "movie"
                      ? crewMedia.title!
                      : crewMedia.name!
                  }
                  image={getPosterImage(crewMedia.poster_path, "w342")}
                  text={crewMedia.job}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleDetailsPage;
