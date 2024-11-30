import { useQuery } from '@tanstack/react-query';
import { fetchResults } from '../../services/http';
import classes from './PeoplePage.module.css';
import { IPeople } from '../../models/peopleModel';
import PersonItem from '../../components/list_items/person_item/PersonItem';

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
          <PersonItem
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
