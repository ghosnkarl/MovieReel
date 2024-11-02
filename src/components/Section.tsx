import classes from '../styles/section.module.css';

interface SectionProps {
  children: JSX.Element | JSX.Element[];
  border: 'left' | 'top';
}

const Section = ({ children, border }: SectionProps) => {
  return (
    <div className={`${classes.container} ${classes[`border--${border}`]}`}>
      {children}
    </div>
  );
};

export default Section;
