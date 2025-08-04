import { useUserStore } from '@/lib/store';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const handleSignIn = () => {
    // Set user data in the store
    setUser({
      id: '1',
      name: 'Lucas',
      email: 'lucas@example.com',
    });

    // Navigate to the home screen or perform sign-in
    router.replace('/(tabs)/profile');
  };

  useEffect(() => {
    console.log('User:', user);
  }, [user]);

  return (
    <View style={styles.container}>
      {/* Imagem ilustrativa - substitua depois por Image */}
      <View style={styles.illustration}>
        <Image
          source={require('@/assets/images/app-logo.png')}
          style={{ width: 100, height: 100 }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="email" size={20} />
        <TextInput placeholder="Email" style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>

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
          <Text>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text>Google</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text>New here? </Text>
        <TouchableOpacity>
          <Text style={styles.signUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
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
  illustration: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 5, width: '100%' },
  input: { marginLeft: 10, flex: 1 },
  forgot: { alignSelf: 'flex-end', marginVertical: 5 },
  signInButton: { backgroundColor: '#ddd', padding: 15, borderRadius: 5, width: '100%', alignItems: 'center', marginVertical: 10 },
  signInText: { fontWeight: 'bold' },
  or: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#888',
  },
  socialContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  socialButton: { backgroundColor: '#eee', padding: 15, borderRadius: 5, flex: 1, alignItems: 'center', marginHorizontal: 5 },
  footer: { flexDirection: 'row', marginTop: 20 },
  signUp: { fontWeight: 'bold' },
});
