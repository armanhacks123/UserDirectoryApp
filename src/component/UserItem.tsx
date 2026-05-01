import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { toggleFavorite } from '../redux/slice/userSlice';

const UserItem = ({ user, onPress }: any) => {
  const dispatch = useAppDispatch();
  const { favorites = [] } = useAppSelector(state => state.users);

  const isFav = favorites.some(f => f.id === user.id);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={styles.card}
    >
      {/* LEFT SIDE */}
      <View style={styles.left}>

        {/* Avatar + Online Dot */}
        <View style={styles.avatarWrapper}>
          <Image
            source={{
              uri: `https://i.pravatar.cc/150?img=${user.id}`,
            }}
            style={styles.avatar}
          />
          <View style={styles.onlineDot} />
        </View>

        {/* User Info */}
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.name}>
            {user.name}
          </Text>
          <Text numberOfLines={1} style={styles.email}>
            {user.email}
          </Text>
        </View>
      </View>

      {/* RIGHT SIDE */}
      <TouchableOpacity
        onPress={() => dispatch(toggleFavorite(user))}
        style={styles.favoriteBtn}
      >
        <Text style={styles.heart}>
          {isFav ? '❤️' : '🤍'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#fff',
    padding: 14,
    marginVertical: 6,
    marginHorizontal: 4,

    borderRadius: 16,

    elevation: 4, // Android shadow
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  avatarWrapper: {
    position: 'relative',
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
  },

  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },

  info: {
    marginLeft: 12,
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },

  email: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

  favoriteBtn: {
    padding: 6,
  },

  heart: {
    fontSize: 22,
  },
});