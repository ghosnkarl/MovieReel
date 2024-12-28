import { IIdName } from '../../../models/commonModel';
import classes from './LinksList.module.css';

interface ILinksListProps {
  links: IIdName[] | undefined;
  title: string;
}

const LinksList = ({ links, title }: ILinksListProps) => {
  if (!links) return null;

  return (
    <div>
      <p className={classes.title}>{title}</p>

      <ul className={classes.list}>
        {links.map((link) => (
          <li key={link.id}>{link.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LinksList;
