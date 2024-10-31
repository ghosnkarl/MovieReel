import { useEffect, useRef, useState } from 'react';
import { VideoInterface } from '../../../models/mediaModel';
import classes from './video.module.css';
import ListArrows from '../../horizontal_list/arrows/ListArrows';
import { NavLink } from 'react-router-dom';
import MotionDiv from '../../ui/MotionDiv';
import { IoPlayCircleOutline } from 'react-icons/io5';
import Section from '../../section/Section';

const VideoItem = ({ video }: { video: VideoInterface }) => {
  return (
    <MotionDiv>
      <NavLink
        target='_blank'
        to={`https://www.youtube.com/watch?v=${video.key}`}
        className={classes['video__item']}
      >
        <img
          alt={video.name}
          src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
        />

        <IoPlayCircleOutline className={classes['video__item--play']} />
      </NavLink>
    </MotionDiv>
  );
};

const VideoList = ({ videos }: { videos: VideoInterface[] }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [ref, setRef] = useState<HTMLUListElement | null>(null);

  useEffect(() => {
    setRef(listRef.current);
  }, [listRef]);
  return (
    <Section>
      <div className='list-header'>
        <h1 className='homepage-title'>Videos</h1>
        <ListArrows listRef={ref} />
      </div>
      <ul ref={listRef} className={classes['videos']}>
        {videos.map((video) => (
          <VideoItem key={video.key} video={video} />
        ))}
      </ul>
    </Section>
  );
};

export default VideoList;
