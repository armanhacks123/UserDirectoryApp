import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  useColorScheme,
  Linking,
  TouchableOpacity,
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigations';

type Props = {
  route: RouteProp<RootStackParamList, 'UserDetailScreen'>;
};

const UserDetailScreen = ({ route }: Props) => {
  const { user } = route.params;
  const scheme = useColorScheme();

  const isDark = scheme === 'dark';

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: isDark ? '#000' : '#f5f5f5',
      }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={{
            uri: `https://i.pravatar.cc/150?img=${user.id}`,
          }}
          style={styles.avatar}
        />
      </View>

      {/* CARD */}
      <View
        style={[
          styles.card,
          { backgroundColor: isDark ? '#1e1e1e' : '#fff' },
        ]}
      >
        <Text
          style={[
            styles.name,
            { color: isDark ? '#fff' : '#000' },
          ]}
        >
          {user.name}
        </Text>

        <Info
          label="📧 Email"
          value={user.email}
          onPress={() => Linking.openURL(`mailto:${user.email}`)}
        />

        <Info label="📞 Phone" value={user.phone} />

        <Info
          label="🌐 Website"
          value={user.website}
          onPress={() =>
            Linking.openURL(`https://${user.website}`)
          }
        />

        <Info
          label="🏢 Company"
          value={user.company?.name || 'N/A'}
        />

        <Info
          label="📍 Address"
          value={
            user.address
              ? `${user.address.street}, ${user.address.city}`
              : 'N/A'
          }
        />
      </View>
    </ScrollView>
  );
};

export default UserDetailScreen;


// ✅ REUSABLE INFO COMPONENT
type InfoProps = {
  label: string;
  value?: string;
  onPress?: () => void;
};

const Info = ({ label, value, onPress }: InfoProps) => {
  return (
    <TouchableOpacity
      style={styles.infoRow}
      onPress={onPress}
      activeOpacity={onPress ? 0.6 : 1}
    >
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || 'N/A'}</Text>
    </TouchableOpacity>
  );
};


// 🎨 STYLES
const styles = StyleSheet.create({
  header: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#4facfe',
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: -70,
  },

  card: {
    marginTop: 80,
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  infoRow: {
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    color: '#888',
  },

  value: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 3,
  },
});