import React, {
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react';

import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';

import {
  useAppDispatch,
  useAppSelector,
} from '../hooks/hooks';

import {
  fetchUsers,
} from '../redux/slice/userSlice';

import UserItem from '../components/UserItem';

import { User } from '../types/user';

const UserListScreen = () => {
  const dispatch = useAppDispatch();

  const {
    users,
    loading,
    page,
    hasMore,
    error,
  } = useAppSelector(
    state => state.users,
  );

  const [search, setSearch] =
    useState('');

  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers(1));
    }
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const fullName =
        `${user.firstName || ''} ${user.lastName || ''
        }`

      return fullName
        .toLowerCase()
        .includes(
          search.toLowerCase(),
        );
    });
  }, [search, users]);

  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchUsers(page));
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: User }) => (
      <UserItem user={item} />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search users..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderItem}
          keyExtractor={item =>
            item.id.toString()
          }
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          removeClippedSubviews
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={
            false
          }
          ListFooterComponent={
            loading ? (
              <ActivityIndicator
                size="large"
              />
            ) : null
          }
        />
      )}
    </View>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  search: {
    margin: 12,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});