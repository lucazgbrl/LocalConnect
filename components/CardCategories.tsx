import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Category = {
  id: string;
  name: string;
  icon: string;
};

const ALL_CATEGORIES: Category[] = [
  { id: '1', name: 'Restaurants', icon: 'restaurant' },
  { id: '2', name: 'Beauty', icon: 'flower' },
  { id: '3', name: 'Home', icon: 'construct' },
  { id: '4', name: 'Fitness', icon: 'barbell' },
  { id: '5', name: 'Shopping', icon: 'cart' },
  { id: '6', name: 'Travel', icon: 'airplane' },
  { id: '7', name: 'Pets', icon: 'paw' },
  { id: '8', name: 'Education', icon: 'school' },
  // Adicione mais categorias aqui
];

export default function CardCategories() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {ALL_CATEGORIES.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <Icon name={category.icon} size={24} color="#fff" />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f8f8f8'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    flexDirection: 'row',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  categoryCard: {
    backgroundColor: '#000',
    borderRadius: 12,
    width: 80,
    height: 80,
    marginRight: 12,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
});
