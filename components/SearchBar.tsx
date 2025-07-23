// a search bar component that can be used in various parts of the app
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export function SearchBar() {
  return (
    <View style={styles.container}>
      <IconSymbol name="search.fill" size={24} color="#888" />
      <TextInput
        placeholder="Search..."
        style={styles.input}
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 4,
    backgroundColor: '#fff',
    maxWidth: 300,
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'transparent',
    width: '100%',
  },
});