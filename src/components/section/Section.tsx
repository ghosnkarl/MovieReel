import classes from './section.module.css';

const Section = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Section;
