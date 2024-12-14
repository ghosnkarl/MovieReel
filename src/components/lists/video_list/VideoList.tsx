import classes from './VideoList.module.css';
import { NavLink } from 'react-router-dom';
import { IVideo } from '../../../models/commonModel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import EmptyResource from '../../ui/empty_resource/EmptyResource';

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
        <LazyLoadImage
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
  mediaTitle: string | undefined;
}

const VideoList = ({ videos, mediaTitle }: IVideoList) => {
  return (
    <>
      {videos.length > 0 && (
        <div className={classes['videos__container']}>
          {videos.map((video) => (
            <VideoItem key={video.key} video={video} />
          ))}
        </div>
      )}

      {videos.length === 0 && (
        <EmptyResource
          title='No Videos'
          description={`There are no videos for ${mediaTitle}.`}
        />
      )}
    </>
  );
};

export default VideoList;
