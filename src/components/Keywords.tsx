import Section from './Section';
import classes from '../styles/keywords.module.css';
const Keywords = ({
  keywords,
}: {
  keywords: { id: number; name: string }[];
}) => {
  return (
    <>
      {keywords && keywords.length > 0 && (
        <Section border='top'>
          <h1 className='section__title'>Keywords</h1>
          <div className={classes['keywords']}>
            {keywords.map((keyword) => (
              <span key={keyword.id}>{keyword.name}</span>
            ))}
          </div>
        </Section>
      )}
    </>
  );
};

export default Keywords;
