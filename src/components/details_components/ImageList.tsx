import classes from '../../styles/image-list.module.css';
import Section from '../section/Section';
import { getBackdropImage } from '../../helpers/imageSizes';
import HeaderLink from '../HeaderLink';

interface ImageListProps {
  backdropList: { file_path: string }[];
  title: string;
  images: { galleryImage: string; fullImage: string }[];
  image: string;
}

const ImageList = ({ backdropList, title, images, image }: ImageListProps) => {
  if (backdropList && backdropList.length > 8)
    backdropList = backdropList.slice(0, 8);
  return (
    <>
      {backdropList && backdropList.length > 0 && (
        <Section border='left'>
          <HeaderLink
            linkState={{ images, title, image }}
            title='Images'
            link='images'
          />

          <div className={classes.images}>
            {backdropList.map((backdrop) => (
              <img
                key={backdrop.file_path}
                src={getBackdropImage(backdrop.file_path, 'w780')}
                alt={title}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
};

export default ImageList;
