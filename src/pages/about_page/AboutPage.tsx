import { NavLink } from 'react-router-dom';
import styles from './AboutPage.module.css';
import { links } from '../../helpers/links';

const LINKS = [
  {
    title: 'GitHub Profile',
    link: links.GITHUB_PROFILE,
  },
  {
    title: 'Source Code',
    link: links.SOURCE_CODE,
  },
  {
    title: 'Submit a Bug',
    link: links.SUBMIT_BUG,
  },
  {
    title: 'LinkedIn Profile',
    link: links.LINKEDIN_PROFILE,
  },
];

const FEATURES = [
  'Browse popular movies and TV shows.',
  'Search for movies, tv shows, people, etc.',
  'View movie details including trailers, ratings, and reviews.',
  'Responsive design for optimal mobile experience',
  'User-friendly interface with intuitive navigation',
];

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <section>
        <h2>About This Project</h2>
        <p>
          MovieReel is a movie discovery platform that fetches data from{' '}
          <NavLink
            className={styles['about__link']}
            target='_blank'
            to={links.TMDB}
          >
            The Movie Database (TMDB) API
          </NavLink>
          . It allows users to explore movies, TV shows, and related content
          with ease, providing a rich and engaging experience for movie lovers.
        </p>
      </section>

      <section>
        <h2>Project Features</h2>
        <ul>
          {FEATURES.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Links</h2>
        <ul>
          {LINKS.map((link) => (
            <li key={link.title}>
              <a
                href={link.link}
                target='_blank'
                className={styles['about__link']}
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Contact Me</h2>
        <p>If you have any questions, feel free to reach out!</p>
        <p>
          Email:{' '}
          <NavLink
            className={styles['about__link']}
            to={`mailto:${links.EMAIL}`}
          >
            {links.EMAIL}
          </NavLink>
        </p>
      </section>

      <section>
        <h2>Additional Information</h2>
        <p>
          MovieReel was developed to help users discover and interact with their
          favorite movies and TV shows. The project is open source and
          contributions are welcome!
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
