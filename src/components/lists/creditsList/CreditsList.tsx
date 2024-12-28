import { ICast, ICrew } from '../../../models/castCrewModel';
import CreditItem from './CreditItem';

const getCreditDetails = (credit: ICast | ICrew) => {
  const isCast = 'character' in credit || 'roles' in credit;
  const key = isCast
    ? credit.cast_id || credit.roles?.[0]?.credit_id
    : credit.credit_id || credit.jobs?.[0]?.credit_id;

  const text = isCast
    ? credit.character ||
      credit.roles
        ?.map((role) => `${role.character} (${role.episode_count} episodes)`)
        .join(', ')
    : credit.job ||
      credit.jobs
        ?.map((job) => `${job.job} (${job.episode_count} episodes)`)
        .join(', ');

  return { key, text };
};

interface CreditsListProps {
  credits: ICast[] | ICrew[] | undefined;
}

const CreditsList = ({ credits }: CreditsListProps) => {
  return (
    <div className='credits-list__container'>
      {credits?.map((credit) => {
        const { key, text } = getCreditDetails(credit);

        return (
          <CreditItem
            key={key}
            id={credit.id}
            profile_path={credit.profile_path}
            title={credit.name}
            text={text}
          />
        );
      })}
    </div>
  );
};

export default CreditsList;
