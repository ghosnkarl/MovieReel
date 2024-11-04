import { useQuery } from '@tanstack/react-query';
import { fetchPaginatedResults } from '../../services/http';
import classes from '../../styles/people-page.module.css';
import { PeopleListInterface } from '../../models/peopleModel';
import PersonListItem from '../../components/PersonListItem';

export default function PeoplePage() {
  const { data } = useQuery({
    queryKey: ['popular', 'people'],
    queryFn: () =>
      fetchPaginatedResults({ path: 'person/popular', params: null }),
    retry: 1,
  });

  return (
    <div className={classes.container}>
      {data &&
        data.map((person: PeopleListInterface) => (
          <PersonListItem
            key={person.id}
            profile_path={person.profile_path}
            title={person.name}
            // text={person.known_for
            //   .map((media) => (media.name ? media.name : media.title))
            //   .join(', ')}
            text={null}
            id={person.id}
          />
        ))}
    </div>
  );
}
