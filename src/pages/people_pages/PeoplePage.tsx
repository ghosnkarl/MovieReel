import PersonItem from '../../components/list_items/person_item/PersonItem';
import usePopularPeople from '../../hooks/usePopularPeople';

export default function PeoplePage() {
  const { data } = usePopularPeople();

  return (
    <div className='page-container'>
      <ul className='grid--7-cols'>
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
      </ul>
    </div>
  );
}
