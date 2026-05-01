import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  useColorScheme,
} from 'react-native';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigations';

type NavProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const FavoritesScreen = () => {
  const navigation = useNavigation<NavProp>();
  const favorites = useSelector(
    (state: RootState) => state.users.favorites
  );

  const isDark = useColorScheme() === 'dark';

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: isDark ? '#1e1e1e' : '#fff' },
          ]}
          onPress={() =>
            navigation.navigate('UserDetailScreen', { user: item })
          }
        >
          <View style={styles.left}>
            <Image
              source={{
                uri: `https://i.pravatar.cc/150?img=${item.id}`,
              }}
              style={styles.avatar}
            />

            <View style={styles.info}>
              <Text
                style={[
                  styles.name,
                  { color: isDark ? '#fff' : '#000' },
                ]}
              >
                {item.name}
              </Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          </View>

          <Text style={styles.heart}>❤️</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', marginTop: 50 }}>
          ❤️ No favorites yet
        </Text>
      }
    />
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
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