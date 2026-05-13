import React, {
  memo,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import { User } from '../types/user';

import {
  useAppDispatch,
  useAppSelector,
} from '../hooks/hooks';

import { toggleFavorite } from '../redux/slice/userSlice';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  RootStackParamList,
} from '../types/navigations';

type NavProp =
  NativeStackNavigationProp<
    RootStackParamList,
    'Home'
  >;

interface Props {
  user: User;
}

const UserItem = ({ user }: Props) => {
  const dispatch = useAppDispatch();

  const navigation =
    useNavigation<NavProp>();

  const favorites = useAppSelector(
    state => state.users.favorites,
  );

  const [imageError, setImageError] =
    useState(false);

  const isFavorite = favorites.some(
    item => item.id === user.id,
  );

  // SAFE FULL NAME
  const fullName =
    `${user.firstName || ''} ${user.lastName || ''
      }`.trim() || 'Unknown User';

  // SAFE IMAGE
  const imageUri =
    !imageError && user.image
      ? user.image
      : `https://i.pravatar.cc/150?img=${user.id}`;

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(
          'UserDetailsScreen',
          {
            user,
          },
        )
      }>
      <View style={styles.left}>
        <Image
          source={{
            uri: imageUri,
          }}
          onError={() =>
            setImageError(true)
          }
          style={styles.avatar}
        />

        <View style={styles.info}>
          <Text style={styles.name}>
            {fullName}
          </Text>

          <Text style={styles.email}>
            {user.email ||
              'No Email'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() =>
          dispatch(toggleFavorite(user))
        }>
        <Text style={styles.heart}>
          {isFavorite ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default memo(UserItem);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',

    justifyContent:
      'space-between',

    alignItems: 'center',

    backgroundColor: '#fff',

    marginHorizontal: 12,
    marginVertical: 6,

    padding: 14,

    borderRadius: 12,

    elevation: 2,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',

    flex: 1,
  },

  avatar: {
    width: 55,
    height: 55,

    borderRadius: 30,

    marginRight: 12,

    backgroundColor: '#ddd',
  },

  info: {
    flex: 1,
  },

  name: {
    fontWeight: '700',
    fontSize: 16,

    color: '#000',
  },

  email: {
    color: '#666',

    marginTop: 4,

    fontSize: 13,
  },

  heart: {
    fontSize: 22,
  },
});