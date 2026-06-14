import { useUserStore } from '@/lib/store';
import { UserTypeId } from '@/types/user';
import { Image } from 'expo-image';
import { Redirect } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CONSUMER_LINKS = [
  { icon: 'calendar', label: 'My Bookings' },
  { icon: 'chatbubble', label: 'Chats' },
  { icon: 'notifications', label: 'Notifications' },
  { icon: 'settings', label: 'Options' },
  { icon: 'help-circle', label: 'Help' },
  { icon: 'location', label: 'My Addresses' },
];

const PROVIDER_LINKS = [
  { icon: 'briefcase', label: 'My Business' },
  { icon: 'star', label: 'Reviews' },
  { icon: 'receipt', label: 'Orders' },
  { icon: 'analytics', label: 'Accesses' },
  { icon: 'chatbubble', label: 'Chats' },
  { icon: 'settings', label: 'Manage' },
];

export default function ProfileScreen() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  if (!user) {
    return <Redirect href="/login" />;
  }

  const isProvider = user.id_user_type === 2;
  const profileLinks = isProvider ? PROVIDER_LINKS : CONSUMER_LINKS;

  const handleUserTypeChange = (id_user_type: UserTypeId) => {
    setUser({
      ...user,
      id_user_type,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={user.profileImageUrl}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.userTypeToggle}>
        <TouchableOpacity
          style={[
            styles.userTypeOption,
            !isProvider && styles.userTypeOptionActive,
          ]}
          onPress={() => handleUserTypeChange(1)}
        >
          <Text
            style={[
              styles.userTypeText,
              !isProvider && styles.userTypeTextActive,
            ]}
          >
            Consumer
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.userTypeOption,
            isProvider && styles.userTypeOptionActive,
          ]}
          onPress={() => handleUserTypeChange(2)}
        >
          <Text
            style={[
              styles.userTypeText,
              isProvider && styles.userTypeTextActive,
            ]}
          >
            Service Provider
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linksContainer}>
        {profileLinks.map((link) => (
          <ProfileLink key={link.label} icon={link.icon} label={link.label} />
        ))}
      </View>
    </ScrollView>
  );
}

function ProfileLink({ icon, label }: { icon: string; label: string }) {
  return (
    <TouchableOpacity style={styles.link}>
      <View style={styles.linkLeft}>
        <Icon name={icon} size={22} color="#333" />
        <Text style={styles.linkLabel}>{label}</Text>
      </View>
      <Icon name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: '#f8f8f8',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  userTypeToggle: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
  },
  userTypeOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  userTypeOptionActive: {
    backgroundColor: '#000',
  },
  userTypeText: {
    color: '#555',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  userTypeTextActive: {
    color: '#fff',
  },
  linksContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  linkLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkLabel: {
    fontSize: 16,
    color: '#333',
  },
});
