import { IIdName } from '../../../models/commonModel';
import classes from './KeywordsList.module.css';

interface IKeywords {
  keywords: IIdName[] | null;
}

const KeywordsList = ({ keywords }: IKeywords) => {
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
