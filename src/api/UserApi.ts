import axios from 'axios';

import { User } from '../types/user';

const BASE_URL = 'https://dummyjson.com';

export interface UsersResponse {
  data: User[];
  hasMore: boolean;
}

export const fetchUsersApi = async (
  page: number,
  limit: number = 20,
): Promise<UsersResponse> => {
  const skip = (page - 1) * limit;

  const response = await axios.get(
    `${BASE_URL}/users?limit=${limit}&skip=${skip}`,
  );

  return {
    data: response.data.users,
    hasMore:
      skip + limit < response.data.total,
  };
};