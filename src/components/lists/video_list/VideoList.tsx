import classes from './VideoList.module.css';
import { NavLink } from 'react-router-dom';
import { IVideo } from '../../../models/commonModel';
import HorizontalList from '../../horizontal_list/HorizontalList';

interface IVideoItem {
  video: IVideo;
}

const VideoItem = ({ video }: IVideoItem) => {
  return (
    <NavLink
      to={`https://www.youtube.com/watch?v=${video.key}`}
      target='_blank'
      className={classes.container}
    >
      <div className={classes['img__container']}>
        <img
          className={classes['video__img']}
          alt={video.name}
          src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
        />
      </div>
      <p className={classes.title}>{video.name}</p>
      <p className={classes.type}>{video.type}</p>
    </NavLink>
  );
};

interface IVideoList {
  videos: IVideo[];
}

const VideoList = ({ videos }: IVideoList) => {
  if (!videos || videos.length === 0) return null;
  return (
    <HorizontalList title='Videos' linkState={null} link={null}>
      {videos.map((video) => (
        <VideoItem key={video.key} video={video} />
      ))}
    </HorizontalList>
  );
};

export default VideoList;
