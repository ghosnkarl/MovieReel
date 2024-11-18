import classes from '../../styles/video.module.css';
import { NavLink } from 'react-router-dom';
import { IVideo } from '../../models/videoModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';

interface VideoItemProps {
  video: IVideo;
}

const VideoItem = ({ video }: VideoItemProps) => {
  return (
    <div>
      <NavLink
        to={`https://www.youtube.com/watch?v=${video.key}`}
        target='_blank'
        className={classes['video__item']}
      >
        <img
          alt={video.name}
          src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
        />
      </NavLink>
    </div>
  );
};

const VideoList = ({ videos }: { videos: IVideo[] }) => {
  return (
    <HorizontalListContainer title='Videos' linkState={null} link={null}>
      {videos.map((video) => (
        <VideoItem key={video.key} video={video} />
      ))}
    </HorizontalListContainer>
  );
};

export default VideoList;
