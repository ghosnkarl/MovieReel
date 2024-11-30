import { ICast, ICrew } from '../../models/castCrewModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';
import PersonItem from '../list_items/person_item/PersonItem';

interface ICastList {
  title: string;
  image: string;
  credits: { cast: ICast[]; crew: ICrew[] };
}

const CastList = ({ title, image, credits }: ICastList) => {
  if (!credits) return null;

  let castList = [...credits.cast];
  if (castList.length > 20) castList = castList.slice(0, 20);

  return (
    <HorizontalListContainer
      link='cast'
      linkState={{ title, image, credits }}
      title='Actors'
    >
      {castList.map((cast) => (
        <li
          key={
            cast.cast_id || (cast.roles && cast.roles[0].credit_id) || cast.name
          }
        >
          <PersonItem
            id={cast.id}
            profile_path={cast.profile_path}
            title={cast.name}
            text={
              cast.character ||
              (cast.roles &&
                cast.roles.map((role) => role.character).join(', '))
            }
          />
        </li>
      ))}
    </HorizontalListContainer>
  );
};

export default CastList;
