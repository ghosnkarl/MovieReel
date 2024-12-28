import { LazyLoadImage } from 'react-lazy-load-image-component';
import classes from './ImageList.module.css';
import { NavLink } from 'react-router-dom';
import EmptyResource from '../../ui/emptyResource/EmptyResource';

interface ImageListProps {
  images: {
    galleryImage: string;
    fullImage: string;
  }[];
  mediaTitle: string | undefined;
}

const ImageList = ({ images, mediaTitle }: ImageListProps) => {
  return (
    <>
      {images.length > 0 && (
        <div className={classes.grid}>
          {images.map((image) => (
            <NavLink
              className={classes.container}
              key={image.galleryImage}
              to={image.fullImage}
              target='_blank'
            >
              <LazyLoadImage
                className={classes.image}
                alt={image.galleryImage}
                src={image.galleryImage}
              />
            </NavLink>
          ))}
        </div>
      )}
      {images.length === 0 && (
        <EmptyResource
          title='No Images'
          description={`There are no images for ${mediaTitle}`}
        />
      )}
    </>
  );
};

export default ImageList;
