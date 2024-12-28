import classes from '@/components/lists/videoList/VideoList.module.css';
import { NavLink } from 'react-router-dom';
import { IVideo } from '@/models/commonModel';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import EmptyResource from '@/components/ui/emptyResource/EmptyResource';

const VideoItem = ({ video }: { video: IVideo }) => {
  return (
    <NavLink
      to={`https://www.youtube.com/watch?v=${video.key}`}
      target='_blank'
      className={classes.container}
    >
      <div className={classes.imgContainer}>
        <LazyLoadImage
          className={classes.videoImg}
          alt={video.name}
          src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
        />
      </div>
      <p className={classes.title}>{video.name}</p>
      <p className={classes.type}>{video.type}</p>
    </NavLink>
  );
};

interface VideoListProps {
  videos: IVideo[];
  mediaTitle: string | undefined;
}

const VideoList = ({ videos, mediaTitle }: VideoListProps) => {
  return (
    <>
      {videos.length > 0 && (
        <div className='grid--4-cols'>
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
