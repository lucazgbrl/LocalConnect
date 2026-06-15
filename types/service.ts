import { ImageSourcePropType } from 'react-native';

export default interface Service {
  id: string;
  name: string;
  description?: string;
  imageSrc: ImageSourcePropType;
  rating: number;
  tags: string[];
  distanceMeters?: number;
}
