import classes from '../../styles/image-list.module.css';
import { getBackdropImage } from '../../helpers/imageSizes';
import HeaderLink from '../HeaderLink';
import { NavLink } from 'react-router-dom';

interface ImageListProps {
  backdropList: { file_path: string }[];
  title: string;
  images: { galleryImage: string; fullImage: string }[];
  image: string;
}

const ImageList = ({ backdropList, title, images, image }: ImageListProps) => {
  if (backdropList && backdropList.length === 0) return null;

  if (backdropList.length > 10) backdropList = backdropList.slice(0, 10);

  return (
    <div>
      <HeaderLink
        linkState={{ images, title, image }}
        title='Images'
        link='images'
      />

      <div className={classes.images}>
        {backdropList.map((backdrop) => (
          <NavLink
            className={classes['image__container']}
            to={getBackdropImage(backdrop.file_path, 'original')}
            target='_blank'
            key={backdrop.file_path}
          >
            <img
              className={classes.backdrop}
              src={getBackdropImage(backdrop.file_path, 'w780')}
              alt={title}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
