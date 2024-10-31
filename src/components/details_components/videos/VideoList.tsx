import { VideoInterface } from '../../../models/mediaModel';
import classes from './video.module.css';
import MotionDiv from '../../ui/MotionDiv';
import { IoPlayCircleOutline } from 'react-icons/io5';
import ReactPlayer from 'react-player';
import Section from '../../section/Section';
import { useEffect, useRef, useState } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

interface VideoItemProps {
  video: VideoInterface;
  onVideoClicked: (key: string) => void;
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
        onClick={() => onVideoClicked(video.key)}
      >
        <img
          alt={video.name}
          src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
        />

        <IoPlayCircleOutline className={classes['video__item--play']} />
      </div>
    </MotionDiv>
  );
};

const VideoList = ({ videos }: { videos: VideoInterface[] }) => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0].key);

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
        <div className={classes.player}>
          <ReactPlayer
            width='100%'
            height='100%'
            url={`https://www.youtube.com/watch?v=${selectedVideo}`}
            controls={true}
          />
        </div>
        <div className={classes['videos__list--container']}>
          <button className='btn-arrow' onClick={handleLeft}>
            <MdNavigateBefore />
          </button>

          <ul ref={listRef} className='horizontal-list__container'>
            {videos.map((video) => (
              <VideoItem
                selectedVideoKey={selectedVideo}
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
