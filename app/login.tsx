import { useUserStore } from '@/lib/store';
import { users } from '@/assets/mocks/users_mock';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = () => {
    const trimmedEmail = email.trim().toLowerCase();
    const foundUser = users.find((item) => item.email.toLowerCase() === trimmedEmail);

    if (!foundUser) {
      setError('Usuário não encontrado. Use um e-mail válido do mock.');
      return;
    }

    if (foundUser.password !== password) {
      setError('Senha incorreta. Tente novamente.');
      return;
    }

    setError('');
    setUser(foundUser);
    router.replace('/(tabs)/profile');
  };


  const handleBackToHome = () => {
    router.replace('/(tabs)/home');
  }

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
        <MaterialIcons name="email" size={20} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={20} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}

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

      <TouchableOpacity style={styles.backToHomeButton} onPress={handleBackToHome}>
        <Text>Voltar para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  error: { color: '#c00', marginTop: 8 },
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
  socialText: { marginTop: 6, fontWeight: '600' },
  footer: { flexDirection: 'row', marginTop: 20 },
  signUp: { fontWeight: 'bold' },
  backToHomeButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10
  }
});
