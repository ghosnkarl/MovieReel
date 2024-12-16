import {
  MdOutlineHome,
  MdOutlineInfo,
  MdOutlineMovie,
  MdOutlinePerson,
  MdOutlineTv,
} from 'react-icons/md';
import { RiCompassDiscoverLine } from 'react-icons/ri';

export const NAV_LINKS = [
  {
    link: '/',
    title: 'Home',
    icon: <MdOutlineHome />,
  },
  {
    link: '/movie',
    title: 'Movies',
    icon: <MdOutlineMovie />,
  },
  {
    link: '/tv',
    title: 'TV Shows',
    icon: <MdOutlineTv />,
  },
  {
    link: '/person',
    title: 'People',
    icon: <MdOutlinePerson />,
  },
  {
    link: '/discover',
    title: 'Discover',
    icon: <RiCompassDiscoverLine />,
  },
  {
    link: '/about',
    title: 'About',
    icon: <MdOutlineInfo />,
  },
];
