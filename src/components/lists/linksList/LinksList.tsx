import { IBaseIdName } from '@/models/commonModel';
import classes from '@/components/lists/linksList/LinksList.module.css';

interface LinksListProps {
  links: IBaseIdName[] | undefined;
  title: string;
}

const LinksList = ({ links, title }: LinksListProps) => {
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
