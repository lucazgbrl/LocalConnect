import { User } from '@/types/user';

export const users: User[] = [
  {
    id: 'u1',
    name: 'Lucas Silva',
    email: 'lucas@localconnect.com',
    password: 'lucas123',
    id_user_type: 1,
    profileImageUrl: require('@/assets/images/cropped.jpg'),
    favoriteServiceIds: ['1', '3', '5'],
  },
  {
    id: 'u2',
    name: 'Ana Pereira',
    email: 'ana@localconnect.com',
    password: 'ana123',
    id_user_type: 2,
    // Random user portrait (selfie-like) from randomuser.me
    profileImageUrl: { uri: 'https://randomuser.me/api/portraits/women/68.jpg' },
    favoriteServiceIds: ['2', '4', '10'],
  },
];
