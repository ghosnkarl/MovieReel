import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '../../services/http';
import classes from '../../styles/people-page.module.css';
import { IPeople } from '../../models/peopleModel';
import PersonListItem from '../../components/PersonListItem';

export default function PeoplePage() {
  const { data } = useQuery({
    queryKey: ['popular', 'people'],
    queryFn: () =>
      fetchResults<IPeople>({ path: 'person/popular', params: null }),
    retry: 1,
  });

  return (
    <div className={classes.container}>
      {data &&
        data.map((person) => (
          <PersonListItem
            key={person.id}
            profile_path={person.profile_path}
            title={person.name}
            text={null}
            id={person.id}
          />
        ))}
    </div>
  );
}
