import { useQuery } from '@tanstack/react-query';
import { fetchPaginatedResults } from '../../services/http';
import ListItem from '../../components/horizontal_list/ListItem';
import { getProfileImage } from '../../helpers/imageSizes';
import classes from './people-page.module.css';
import { PeopleListInterface } from '../../models/peopleModel';

export default function PeoplePage() {
  const { data, isError, error, refetch } = useQuery({
    queryKey: ['popular', 'people'],
    queryFn: () =>
      fetchPaginatedResults({ path: 'people/popular', params: null }),
    retry: 1,
  });

  return (
    <div className={classes.container}>
      {data &&
        data.map((person: PeopleListInterface) => (
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
