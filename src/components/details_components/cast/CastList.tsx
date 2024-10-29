import { NavLink } from "react-router-dom";
import { CastInterface, CrewInterface } from "../../../models/mediaModel";
import classes from "./cast.module.css";
import { getProfileImage } from "../../../helpers/imageSizes";
import { useEffect, useRef, useState } from "react";
import ListArrows from "../../horizontal_list/arrows/ListArrows";
import CastItem from "./CastItem";

import { IoChevronForward } from "react-icons/io5";

const CastList = ({
  title,
  image,
  credits,
}: {
  title: string;
  image: string;
  credits: { cast: CastInterface[]; crew: CrewInterface[] };
}) => {
  let castList = [...credits.cast];
  if (castList.length > 20) castList = castList.slice(0, 20);
  const listRef = useRef<HTMLUListElement>(null);
  const [ref, setRef] = useState<HTMLUListElement | null>(null);

  useEffect(() => {
    setRef(listRef.current);
  }, [listRef]);
  return (
    <div>
      <div className="list-header">
        <NavLink
          to="cast"
          state={{ title, image, credits }}
          className="section-link"
        >
          Actors
          <IoChevronForward />
        </NavLink>
        <ListArrows listRef={ref} />
      </div>
      <ul ref={listRef} className={classes["cast-container"]}>
        {castList.map((cast) => (
          <CastItem
            key={cast.credit_id}
            link={`/people/${cast.id}`}
            image={getProfileImage(cast.profile_path, "w185")}
            title={cast.name}
            text={cast.character}
          />
        ))}
      </ul>
    </div>
  );
};

export default CastList;
