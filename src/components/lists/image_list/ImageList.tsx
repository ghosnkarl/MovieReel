import classes from './ImageList.module.css';
import { getBackdropImage } from '../../../helpers/imageSizes';
import { NavLink } from 'react-router-dom';
import HorizontalList from '../../horizontal_list/HorizontalList';

interface IImageList {
  backdropList: { file_path: string }[];
  title: string;
  images: { galleryImage: string; fullImage: string }[];
  image: string;
}

const ImageList = ({ backdropList, title, images, image }: IImageList) => {
  if (backdropList && backdropList.length === 0) return null;

  if (backdropList.length > 10) backdropList = backdropList.slice(0, 10);

  return (
    <HorizontalList
      linkState={{ images, title, image }}
      title='Images'
      link='images'
    >
      {backdropList.map((backdrop) => (
        <NavLink
          to={getBackdropImage(backdrop.file_path, 'original')}
          target='_blank'
          key={backdrop.file_path}
        >
          <div className={classes.container}>
            <img
              className={classes.backdrop}
              src={getBackdropImage(backdrop.file_path, 'w780')}
              alt={title}
            />
          </div>
        </NavLink>
      ))}
    </HorizontalList>
  );
};

export default ImageList;
