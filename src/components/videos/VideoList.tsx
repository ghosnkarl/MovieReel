import { useEffect, useRef, useState } from "react";
import { VideoInterface } from "../../models/mediaModel";

import classes from "./video.module.css";
import VideoItem from "./VideoItem";
import ListArrows from "../horizontal_list/arrows/ListArrows";

const VideoList = ({ videos }: { videos: VideoInterface[] }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [ref, setRef] = useState<HTMLUListElement | null>(null);

  useEffect(() => {
    setRef(listRef.current);
  }, [listRef]);
  return (
    <div>
      <div className="list-header">
        <h1 className="homepage-title">Videos</h1>
        <ListArrows listRef={ref} />
      </div>
      <ul ref={listRef} className={classes["video-container"]}>
        {videos.map((video) => (
          <VideoItem key={video.key} video={video} />
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
