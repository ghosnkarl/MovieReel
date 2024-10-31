import { useQuery } from '@tanstack/react-query';
import { fetchPopular } from '../../services/http';
import ListItem from '../../components/horizontal_list/ListItem';
import { getProfileImage } from '../../helpers/imageSizes';
import classes from './people-page.module.css';

export default function PeoplePage() {
  const { data, isError, error, refetch } = useQuery({
    queryKey: ['popular_people'],
    queryFn: () => fetchPopular(),
    retry: 1,
  });

  return (
    <div className={classes.container}>
      {data &&
        data.map((person) => (
          <ListItem
            key={person.id}
            image={getProfileImage(person.profile_path, 'w185')}
            title={person.name}
            text={person.known_for
              .map((media) => (media.name ? media.name : media.title))
              .join(', ')}
            link={`/people/${person.id}`}
          />
        ))}
    </div>
  );
}
