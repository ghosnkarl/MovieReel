import { PeopleListInterface } from '../../models/peopleModel';
import PersonListItem from '../PersonListItem';

const PeopleList = ({ data }: { data: PeopleListInterface[] }) => {
  return (
    <>
      {data.map((item) => {
        return (
          <PersonListItem
            key={item.id}
            id={item.id}
            text={null}
            title={item.name}
            profile_path={item.profile_path}
          />
        );
      })}
    </>
  );
};

export default PeopleList;
