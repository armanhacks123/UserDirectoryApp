import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
  useColorScheme,
  Animated,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  toggleFavorite,
  loadFavorites,
  User,
} from '../redux/slice/userSlice';
import { RootState, AppDispatch } from '../redux/store';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigations';

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const UserListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavProp>();

  const { list, favorites } = useSelector(
    (state: RootState) => state.users
  );

  const [search, setSearch] = useState('');
  const scheme = useColorScheme(); // 🌙 dark mode

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(loadFavorites());
  }, []);

  const filtered = list.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const isFav = (item: User) =>
    favorites.some(u => u.id === item.id);

  const renderItem = ({ item }: { item: User }) => {
    const scale = new Animated.Value(1);

    const animate = () => {
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.3, duration: 150, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 150, useNativeDriver: true }),
      ]).start();
    };

    return (
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: scheme === 'dark' ? '#1e1e1e' : '#fff' },
        ]}
        onPress={() =>
          navigation.navigate('UserDetailScreen', { user: item })
        }
      >
        <View style={styles.left}>
          {/* Avatar */}
          <View>
            <Image
              source={{
                uri: `https://i.pravatar.cc/150?img=${item.id}`,
              }}
              style={styles.avatar}
            />

            {/* 🟢 Online dot */}
            <View style={styles.onlineDot} />
          </View>

          <View style={styles.info}>
            <Text
              style={[
                styles.name,
                { color: scheme === 'dark' ? '#fff' : '#000' },
              ]}
            >
              {item.name}
            </Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        </View>

        {/* ⭐ Animated Favorite */}
        <TouchableOpacity
          onPress={() => {
            animate();
            dispatch(toggleFavorite(item));
          }}
        >
          <Animated.Text
            style={[
              styles.heart,
              { transform: [{ scale }] },
            ]}
          >
            {isFav(item) ? '❤️' : '🤍'}
          </Animated.Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: scheme === 'dark' ? '#000' : '#f5f5f5',
      }}
    >
      {/* 🔍 SEARCH BAR */}
      <TextInput
        placeholder="Search users..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
        style={[
          styles.search,
          { backgroundColor: scheme === 'dark' ? '#222' : '#fff' },
        ]}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  search: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: 14,
    marginBottom: 10,
    borderRadius: 14,
    elevation: 3,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
  },

  email: {
    fontSize: 13,
    color: '#888',
  },

  heart: {
    fontSize: 22,
  },
});