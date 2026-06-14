import { ImageSourcePropType } from 'react-native';

export type UserTypeId = 1 | 2;

export interface User {
  id: string;
  name: string;
  email: string;
  id_user_type: UserTypeId;
  profileImageUrl?: ImageSourcePropType; // Optional, in case the user doesn't have a profile image
  createdAt?: Date;
  updatedAt?: Date;
}
