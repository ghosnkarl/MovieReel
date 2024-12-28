import { FaBug, FaGithub } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { footerData } from '@/data/footerData';
import classes from '@/components/ui/footer/Footer.module.css';
import { links } from '@/helpers/links';
import logo from '/logo.svg';

const Footer = () => {
  return (
    <footer className={classes.footerContainer}>
      <div className={classes.footerContent}>
        <div className={classes.footerGrid}>
          <img src={logo} alt='MovieReel logo' />

          {footerData.map((footerItem) => (
            <div className={classes.footerItemContainer} key={footerItem.title}>
              <h2 className={classes.footerTitle}>{footerItem.title}</h2>
              {footerItem.items.map((item, index) => (
                <NavLink
                  to={footerItem.link}
                  className={classes.footerLink}
                  key={item.title}
                  state={{ initialTab: index }}
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
        <div className={classes.footerBottom}>
          <div>
            <p className={classes.footerText}>
              Copyright &copy; {new Date().getFullYear()}{' '}
              <NavLink to={links.GITHUB_PROFILE} target='_blank'>
                Karl Ghosn
              </NavLink>{' '}
              - All rights reserved.
            </p>
            <p className={classes.footerText}>
              Data provided by{' '}
              <NavLink to={links.TMDB} target='_blank'>
                TMDB
              </NavLink>
              .
            </p>
          </div>
          <div className={classes.footerActions}>
            <NavLink
              className={classes.footerAction}
              to={links.SOURCE_CODE}
              target='_blank'
            >
              <FaGithub className={classes.footerActionIcon} /> Source Code
            </NavLink>
            <NavLink
              className={classes.footerAction}
              to={links.SUBMIT_BUG}
              target='_blank'
            >
              <FaBug className={classes.footerActionIcon} />
              Submit a bug
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
