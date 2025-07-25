import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CardUserProps = {
  userName: string;
  profileImageUrl: string;
};

export default function CardUser({ userName, profileImageUrl }: CardUserProps) {
  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <Image
          source={profileImageUrl}
          style={styles.profileImage}
        />
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
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});