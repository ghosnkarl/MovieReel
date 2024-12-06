import { IDetailsImages } from '../models/detailsModel';
import { getBackdropImage, getLogoImage, getPosterImage } from './imageSizes';

interface GalleryImagesProps {
  images: IDetailsImages;
}

export const getGalleryImages = ({ images }: GalleryImagesProps) => {
  let backdrops: { galleryImage: string; fullImage: string }[] = [];
  let logos: { galleryImage: string; fullImage: string }[] = [];
  let posters: { galleryImage: string; fullImage: string }[] = [];
  if (images && images.backdrops && images.backdrops.length > 0)
    backdrops = images.backdrops.map((backdrop) => {
      return {
        galleryImage: getBackdropImage(backdrop.file_path, 'w780'),
        fullImage: getBackdropImage(backdrop.file_path, 'original'),
      };
    });

  if (images && images.logos && images.logos.length > 0)
    logos = images.logos.map((logo) => {
      return {
        galleryImage: getLogoImage(logo.file_path, 'w300'),
        fullImage: getLogoImage(logo.file_path, 'original'),
      };
    });

  if (images && images.posters && images.posters.length > 0)
    posters = images.posters.map((posters) => {
      return {
        galleryImage: getPosterImage(posters.file_path, 'w342'),
        fullImage: getPosterImage(posters.file_path, 'original'),
      };
    });

  return [...backdrops, ...logos, ...posters];
};
