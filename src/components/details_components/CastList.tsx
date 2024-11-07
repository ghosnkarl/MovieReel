import { CastInterface, CrewInterface } from '../../models/mediaModel';
import HorizontalListContainer from '../horizontal_list/HorizontalListContainer';
import PersonListItem from '../PersonListItem';

interface CastListProps {
  title: string;
  image: string;
  credits: { cast: CastInterface[]; crew: CrewInterface[] };
}

const CastList = ({ title, image, credits }: CastListProps) => {
  let castList = [...credits.cast];
  if (castList.length > 20) castList = castList.slice(0, 20);

  return (
    <HorizontalListContainer
      link='cast'
      linkState={{ title, image, credits }}
      title='Actors'
    >
      {castList.map((cast) => (
        <li key={cast.credit_id}>
          <PersonListItem
            id={cast.id}
            profile_path={cast.profile_path}
            title={cast.name}
            text={cast.character}
          />
        </li>
      ))}
    </HorizontalListContainer>
  );
};

export default CastList;
