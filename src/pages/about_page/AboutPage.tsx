import { NavLink } from 'react-router-dom';
import styles from './AboutPage.module.css';

const LINKS = [
  {
    title: 'GitHub Profile',
    link: 'https://github.com/your-github-profile',
  },
  {
    title: 'Source Code',
    link: 'https://github.com/your-github-profile',
  },
  {
    title: 'Submit a Bug',
    link: 'https://github.com/your-github-profile',
  },
  {
    title: 'LinkedIn Profile',
    link: 'https://github.com/your-github-profile',
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
            to='https://www.themoviedb.org/'
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
            to='mailto:karl.ghosn.dev@gmail.com'
          >
            karl.ghosn.dev@gmail.com
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
