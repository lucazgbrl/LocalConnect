import { useUserStore } from '@/lib/store';
import { Image } from 'expo-image';
import { Redirect } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen() {
  const user = useUserStore((state) => state.user);
  if (!user) {
    return <Redirect href="/login" />;
  }

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

      <View style={styles.linksContainer}>
        <ProfileLink icon="calendar" label="My Bookings" />
        <ProfileLink icon="chatbubble" label="Chats" />
        <ProfileLink icon="notifications" label="Notifications" />
        <ProfileLink icon="settings" label="Options" />
        <ProfileLink icon="help-circle" label="Help" />
        <ProfileLink icon="location" label="My Addresses" />
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
    backgroundColor: '#f8f8f8',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
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
