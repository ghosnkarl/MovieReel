import { NavLink } from "react-router-dom";
import { VideoInterface } from "../../../models/mediaModel";
import classes from "./video-item.module.css";
import MotionDiv from "../../ui/MotionDiv";
import { IoPlayCircleOutline } from "react-icons/io5";

const VideoItem = ({ video }: { video: VideoInterface }) => {
  return (
    <MotionDiv>
      <NavLink
        target="_blank"
        to={`https://www.youtube.com/watch?v=${video.key}`}
        className={classes.container}
      >
        <img
          alt={video.name}
          src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
        />

        <h2>
          <IoPlayCircleOutline />
        </h2>
      </NavLink>
    </MotionDiv>
  );
};
export default VideoItem;
