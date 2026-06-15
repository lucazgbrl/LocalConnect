import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageSourcePropType } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

type CardUserProps = {
  userName: string;
  profileImageUrl?: ImageSourcePropType;
};

export default function CardUser({ userName, profileImageUrl }: CardUserProps) {
  return (
    <View>
      <TouchableOpacity style={styles.button}>
        {profileImageUrl ? (
          <Image
            source={profileImageUrl as any}
            style={styles.profileImage}
          />
        ) : (
          <View style={[styles.profileImage, styles.avatarPlaceholder]}>
            <FontAwesome name="user" size={20} color="#fff" />
          </View>
        )}
        <Text style={styles.userName}>
          Welcome, {userName}!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#888',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});