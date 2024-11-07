import classes from '../../styles/video.module.css';
import { useEffect, useRef, useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import MotionDiv from '../ui/MotionDiv';
import Section from '../Section';
import { FaYoutube } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { VideoInterface } from '../../models/videoModel';

interface VideoItemProps {
  video: VideoInterface;
  onVideoClicked: (video: VideoInterface) => void;
  selectedVideoKey: string;
}

const VideoItem = ({
  video,
  onVideoClicked,
  selectedVideoKey,
}: VideoItemProps) => {
  return (
    <MotionDiv>
      <div
        className={`${classes['video__item']} ${
          selectedVideoKey === video.key ? classes['video__item--selected'] : ''
        }`}
        onClick={() => onVideoClicked(video)}
      >
        <img
          alt={video.name}
          src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
        />

        <FaYoutube className={classes['video__item--play']} />
      </div>
    </MotionDiv>
  );
};

const VideoList = ({ videos }: { videos: VideoInterface[] }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoInterface>(videos[0]);

  const listRef = useRef<HTMLUListElement>(null);
  const [ref, setRef] = useState<HTMLUListElement | null>(null);

  useEffect(() => {
    setRef(listRef.current);
  }, [listRef]);

  const handleNext = () => {
    if (ref) ref.scrollLeft += ref.clientWidth;
  };

  const handleLeft = () => {
    if (ref) ref.scrollLeft -= ref.clientWidth;
  };

  return (
    <Section border='left'>
      <h1 className='section__title'>Videos</h1>
      <div>
        <NavLink
          to={`https://www.youtube.com/watch?v=${selectedVideo.key}`}
          className={classes.player}
          target='_blank'
        >
          <img
            alt={selectedVideo.name}
            src={`https://i.ytimg.com/vi/${selectedVideo.key}/hqdefault.jpg`}
          />
          <FaYoutube
            className={`${classes['video__item--play']} ${classes['video__item--play--large']}`}
          />
        </NavLink>
        <div className={classes['videos__list--container']}>
          <button className='btn-arrow' onClick={handleLeft}>
            <MdNavigateBefore />
          </button>

          <ul ref={listRef} className='horizontal-list__container'>
            {videos.map((video) => (
              <VideoItem
                selectedVideoKey={selectedVideo.key}
                onVideoClicked={setSelectedVideo}
                key={video.key}
                video={video}
              />
            ))}
          </ul>

          <button className='btn-arrow' onClick={handleNext}>
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </Section>
  );
};

export default VideoList;
