// a search bar component that can be used in various parts of the app
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export function SearchBar() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <IconSymbol name="search.fill" size={24} color="black" />
        <TextInput
          placeholder="Search..."
          style={styles.input}
          placeholderTextColor="#888"
        />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <IconSymbol name="filter" size={33} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    padding: 4,
    backgroundColor: '#fff',
    flex: 1,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  input: {
    fontSize: 16,
    backgroundColor: 'transparent',
    flex: 1, // Expande o input dentro do container
  },
  filterButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
});
