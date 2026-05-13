import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import { fetchUsersApi } from '../../api/UserApi';

import { User } from '../../types/user';

interface UserState {
  users: User[];
  favorites: User[];

  loading: boolean;
  error: string | null;

  page: number;
  hasMore: boolean;
}

const initialState: UserState = {
  users: [],
  favorites: [],

  loading: false,
  error: null,

  page: 1,
  hasMore: true,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',

  async (page: number, thunkAPI) => {
    try {
      return await fetchUsersApi(page);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        'Failed to fetch users',
      );
    }
  },
);

const userSlice = createSlice({
  name: 'users',

  initialState,

  reducers: {
    toggleFavorite: (
      state,
      action: PayloadAction<User>,
    ) => {
      const exists = state.favorites.find(
        item => item.id === action.payload.id,
      );

      if (exists) {
        state.favorites = state.favorites.filter(
          item => item.id !== action.payload.id,
        );
      } else {
        state.favorites.push(action.payload);
      }
    },

    resetUsers: state => {
      state.users = [];
      state.page = 1;
      state.hasMore = true;
    },
  },

  extraReducers: builder => {
    builder

      // FETCH USERS PENDING
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })

      // FETCH USERS SUCCESS
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        // REMOVE DUPLICATE USERS
        const newUsers = action.payload.data.filter(
          newUser =>
            !state.users.some(
              existing =>
                existing.id === newUser.id,
            ),
        );

        // APPEND UNIQUE USERS ONLY
        const mergedUsers = [
          ...state.users,
          ...action.payload.data,
        ];

        const uniqueUsers = mergedUsers.filter(
          (user, index, self) =>
            index ===
            self.findIndex(
              item => item.id === user.id,
            ),
        );

        state.users = uniqueUsers;

        state.hasMore = action.payload.hasMore;

        state.page += 1;
      })

      // FETCH USERS FAILED
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;

        state.error =
          (action.payload as string) ||
          'Something went wrong';
      });
  },
});

export const {
  toggleFavorite,
  resetUsers,
} = userSlice.actions;

export default userSlice.reducer;