import { IIdName } from '../../../models/commonModel';
import classes from './KeywordsList.module.css';

interface IKeywords {
  keywords: IIdName[];
}

const Keywords = ({ keywords }: IKeywords) => {
  return (
    <div>
      {keywords && keywords.length > 0 && (
        <>
          <h1 className='section__title'>Keywords</h1>
          <div className={classes.keywords}>
            {keywords.map((keyword) => (
              <span key={keyword.id}>{keyword.name}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Keywords;
