import { MdNavigateNext } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

interface HeaderLinkProps {
  title: string;
  link: string;
  linkState: unknown;
}

const HeaderLink = ({ title, link, linkState }: HeaderLinkProps) => {
  return (
    <NavLink to={link} state={linkState} className='section__link'>
      {title}
      <MdNavigateNext className='list__header--icon' />
    </NavLink>
  );
};

export default HeaderLink;
