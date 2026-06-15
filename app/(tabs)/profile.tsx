import { useUserStore } from '@/lib/store';
import { UserTypeId } from '@/types/user';
import { Image } from 'expo-image';
import { Redirect } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';

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

const CONSUMER_STATS = [
  { label: 'Bookings', value: '8' },
  { label: 'Favorites', value: '12' },
  { label: 'Reviews', value: '4' },
];

const PROVIDER_STATS = [
  { label: 'Rating', value: '4.8' },
  { label: 'Orders', value: '36' },
  { label: 'Views', value: '1.2k' },
];

export default function ProfileScreen() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  if (!user) {
    return <Redirect href="/login" />;
  }

  const isProvider = user.id_user_type === 2;
  const profileLinks = isProvider ? PROVIDER_LINKS : CONSUMER_LINKS;
  const profileStats = isProvider ? PROVIDER_STATS : CONSUMER_STATS;
  const profileImageSource = user.profileImageUrl;

  const handleUserTypeChange = (id_user_type: UserTypeId) => {
    setUser({
      ...user,
      id_user_type,
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        {profileImageSource ? (
          <Image
            source={profileImageSource as any}
            style={styles.avatar}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <FontAwesome name="user" size={40} color="#fff" />
          </View>
        )}

        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleBadgeText}>
            {isProvider ? 'Service Provider' : 'Consumer'}
          </Text>
        </View>
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

      <View style={styles.summaryContainer}>
        {profileStats.map((stat, index) => (
          <View
            key={stat.label}
            style={[
              styles.summaryItem,
              index === profileStats.length - 1 && styles.summaryItemLast,
            ]}
          >
            <Text style={styles.summaryValue}>{stat.value}</Text>
            <Text style={styles.summaryLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.linksContainer}>
        {profileLinks.map((link) => (
          <ProfileLink key={link.label} icon={link.icon} label={link.label} />
        ))}
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    width: 104,
    height: 104,
    borderRadius: 52,
    marginBottom: 12,
    backgroundColor: '#ddd',
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  roleBadge: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  roleBadgeText: {
    color: '#333',
    fontSize: 12,
    fontWeight: '700',
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
  summaryContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 24,
    overflow: 'hidden',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: '#ddd',
  },
  summaryItemLast: {
    borderRightWidth: 0,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
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
  logoutContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  logoutButton: {
    backgroundColor: '#ff4d4f',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
