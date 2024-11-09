import classes from '../../styles/video.module.css';
import MotionDiv from '../ui/MotionDiv';
import { FaYoutube } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { IVideo } from '../../models/videoModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';

interface VideoItemProps {
  video: IVideo;
}

const VideoItem = ({ video }: VideoItemProps) => {
  return (
    <MotionDiv>
      <NavLink
        to={`https://www.youtube.com/watch?v=${video.key}`}
        target='_blank'
        className={classes['video__item']}
      >
        <img
          alt={video.name}
          src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
        />
        <FaYoutube className={classes['video__item--play']} />
      </NavLink>
    </MotionDiv>
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
