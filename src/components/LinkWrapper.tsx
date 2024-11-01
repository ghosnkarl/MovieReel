import { NavLink } from 'react-router-dom';

interface LinkWrapperProps {
  link: string;
  children: JSX.Element | JSX.Element[];
}

const LinkWrapper = ({ link, children }: LinkWrapperProps) => {
  return (
    <NavLink className='link__wrapper' to={link}>
      {children}
    </NavLink>
  );
};

export default LinkWrapper;
