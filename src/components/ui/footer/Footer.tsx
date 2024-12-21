import { LuPopcorn } from 'react-icons/lu';
import { FaBug, FaGithub } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { footerData } from '../../../data/footerData';
import classes from './Footer.module.css';
import { links } from '../../../helpers/links';

const Footer = () => {
  return (
    <footer className={classes['footer__container']}>
      <div className={classes['footer__content']}>
        <div className={classes['footer__grid']}>
          <LuPopcorn className={classes['footer__logo']} />

          {footerData.map((footerItem) => (
            <div
              className={classes['footer__item--container']}
              key={footerItem.title}
            >
              <h2 className={classes['footer__title']}>{footerItem.title}</h2>
              {footerItem.items.map((item, index) => (
                <NavLink
                  to={footerItem.link}
                  className={classes['footer__link']}
                  key={item.title}
                  state={{ initialTab: index }}
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
        <div className={classes['footer__bottom']}>
          <div>
            {' '}
            <p className={classes['footer__text']}>
              Copyright &copy; {new Date().getFullYear()}{' '}
              <NavLink to={links.GITHUB_PROFILE} target='_blank'>
                Karl Ghosn
              </NavLink>{' '}
              - All rights reserved.
            </p>
            <p className={classes['footer__text']}>
              Data provided by{' '}
              <NavLink to={links.TMDB} target='_blank'>
                TMDB
              </NavLink>
              .
            </p>
          </div>
          <div className={classes['footer__actions']}>
            <NavLink
              className={classes['footer__action']}
              to={links.SOURCE_CODE}
              target='_blank'
            >
              <FaGithub className={classes['footer__action--icon']} /> Source
              Code
            </NavLink>
            <NavLink
              className={classes['footer__action']}
              to={links.SUBMIT_BUG}
              target='_blank'
            >
              <FaBug className={classes['footer__action--icon']} />
              Submit a bug
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
