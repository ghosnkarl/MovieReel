import { IIdName } from '@/models/commonModel';
import classes from '@/components/lists/keywordList/KeywordsList.module.css';

interface KeywordsListProps {
  keywords: IIdName[] | null;
}

const KeywordsList = ({ keywords }: KeywordsListProps) => {
  if (!keywords) return null;
  return (
    <div>
      <h1 className='section__title'>Keywords</h1>
      <ul className={classes.keywords}>
        {keywords.map((keyword) => (
          <li className={classes.keyword} key={keyword.id}>
            {keyword.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeywordsList;
