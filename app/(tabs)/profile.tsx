import { users } from '@/assets/mocks/users_mock';
import Logo from '@/components/Logo';
import { useUserStore } from '@/lib/store';
import { UserTypeId } from '@/types/user';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!user) {
    const handleSignIn = () => {
      const trimmedEmail = email.trim().toLowerCase();
      const foundUser = users.find((item) => item.email.toLowerCase() === trimmedEmail);

      if (!foundUser) {
        setError('Usuário não encontrado. Use um e-mail válido.');
        return;
      }

      if (foundUser.password !== password) {
        setError('Senha incorreta. Tente novamente.');
        return;
      }

      setError('');
      setUser(foundUser);
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.illustration}>
          <Logo size="large" showText={true} />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.or}>OR SIGN WITH</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook" size={18} color="#1877F2" />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="google" size={18} color="#DB4437" />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text>New here? </Text>
          <TouchableOpacity>
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
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
        <Ionicons name={icon as any} size={22} color="#333" />
        <Text style={styles.linkLabel}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
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
  avatarPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#999',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111',
  },
  error: {
    color: '#c00',
    marginBottom: 12,
  },
  signInButton: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  signInText: {
    color: '#fff',
    fontWeight: '700',
  },
  illustration: {
    marginBottom: 20,
    alignItems: 'center',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  or: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#888',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialButton: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  socialText: {
    marginTop: 6,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signUp: {
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
