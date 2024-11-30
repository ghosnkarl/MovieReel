import { ICast, ICrew } from '../../../models/castCrewModel';
import CreditItem from './CreditItem';

interface ICreditsList {
  credits: ICast[] | ICrew[];
}

const CreditsList = ({ credits }: ICreditsList) => {
  return (
    <div className='credits-list__container'>
      {credits.map((credit) => {
        const isCast = 'character' in credit || 'roles' in credit;
        let key: string | number;
        let text: string;

        if (isCast) {
          key = credit.cast_id || credit.roles[0].credit_id;
          text =
            credit.character ||
            (credit.roles &&
              credit.roles
                .map(
                  (role) => `${role.character} (${role.episode_count} episodes)`
                )
                .join(', '));
        } else {
          key = credit.credit_id || credit.jobs[0].credit_id;
          text =
            credit.job ||
            (credit.jobs &&
              `${credit.jobs
                .map((job) => `${job.job} (${job.episode_count} episodes)`)
                .join(', ')}`);
        }

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
