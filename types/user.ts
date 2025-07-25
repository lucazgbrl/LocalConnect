export interface User {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string; // Optional, in case the user doesn't have a profile image
  createdAt?: Date;
  updatedAt?: Date;
}
