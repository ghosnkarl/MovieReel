import { useEffect, useState } from 'react';
import TagsList from '../../components/lists/tagsList/TagsList';
import { MediaItems } from './PeopleDetailsPage';
import { ICrewMedia } from '../../models/peopleModel';

const TaggedList = ({ crew }: { crew: ICrewMedia[] }) => {
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [jobsList, setJobsList] = useState<string[]>([]);

  useEffect(() => {
    const uniqueJobs = [...new Set(crew.map((crew) => crew.job))];
    setJobsList(uniqueJobs);

    if (uniqueJobs.length > 0) setSelectedJob(uniqueJobs[0]);
  }, [crew]);

  const handleSelectJob = (job: string) => {
    setSelectedJob(job);
  };
  return (
    <>
      <TagsList
        tagsList={jobsList}
        handleSelectTag={handleSelectJob}
        selectedTag={selectedJob}
      />
      <MediaItems
        media={crew.filter((item) => item.job === selectedJob)}
        mediaType='credits'
      />
    </>
  );
};

export default TaggedList;
