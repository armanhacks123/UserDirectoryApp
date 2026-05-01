import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;

  company?: {
    name: string;
  };

  address?: {
    street: string;
    city: string;
  };
}

interface UserState {
  list: User[];
  favorites: User[];
  loading: boolean;
}

const initialState: UserState = {
  list: [],
  favorites: [],
  loading: false,
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    return await res.json();
  }
);

// ✅ Load favorites from storage
export const loadFavorites = createAsyncThunk(
  'users/loadFavorites',
  async () => {
    const data = await AsyncStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<User>) => {
      const exists = state.favorites.find(u => u.id === action.payload.id);

      if (exists) {
        state.favorites = state.favorites.filter(
          u => u.id !== action.payload.id
        );
      } else {
        state.favorites.push(action.payload);
      }

      // 💾 Save
      AsyncStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export const { toggleFavorite } = userSlice.actions;
export default userSlice.reducer;