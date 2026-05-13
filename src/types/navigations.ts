import { User } from './user';

export type RootStackParamList = {
  Home: undefined;

  UserDetailsScreen: {
    user: User;
  };
};