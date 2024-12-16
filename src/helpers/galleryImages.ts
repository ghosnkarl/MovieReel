import { IDetailsImages } from '../models/detailsModel';
import { tmdbImage } from './imageSizes';

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
        galleryImage: tmdbImage.backdrop(backdrop.file_path, 'w780'),
        fullImage: tmdbImage.backdrop(backdrop.file_path, 'original'),
      };
    });

  if (images && images.logos && images.logos.length > 0)
    logos = images.logos.map((logo) => {
      return {
        galleryImage: tmdbImage.logo(logo.file_path, 'w300'),
        fullImage: tmdbImage.logo(logo.file_path, 'original'),
      };
    });

  if (images && images.posters && images.posters.length > 0)
    posters = images.posters.map((posters) => {
      return {
        galleryImage: tmdbImage.poster(posters.file_path, 'w342'),
        fullImage: tmdbImage.poster(posters.file_path, 'original'),
      };
    });

  return [...backdrops, ...logos, ...posters];
};
