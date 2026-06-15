import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  backgroundColor: string;
};

const ALL_CATEGORIES: Category[] = [
  { id: '1', name: 'Restaurants', icon: 'restaurant', color: '#C2410C', backgroundColor: '#FFF1E8' },
  { id: '2', name: 'Beauty', icon: 'sparkles', color: '#BE185D', backgroundColor: '#FCE7F3' },
  { id: '3', name: 'Home', icon: 'construct', color: '#047857', backgroundColor: '#DFF7EA' },
  { id: '4', name: 'Fitness', icon: 'barbell', color: '#1D4ED8', backgroundColor: '#E8F0FF' },
  { id: '5', name: 'Shopping', icon: 'cart', color: '#7C3AED', backgroundColor: '#F1EAFF' },
  { id: '6', name: 'Travel', icon: 'airplane', color: '#0369A1', backgroundColor: '#E0F2FE' },
  { id: '7', name: 'Pets', icon: 'paw', color: '#B45309', backgroundColor: '#FEF3C7' },
  { id: '8', name: 'Education', icon: 'school', color: '#4338CA', backgroundColor: '#EDEBFF' },
];

export default function CardCategories() {
  const { width } = useWindowDimensions();
  const cardMinWidth = Math.min(Math.max(width * 0.32, 112), 148);

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
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryCard, { minWidth: cardMinWidth }]}
          >
            <View style={[styles.iconContainer, { backgroundColor: category.backgroundColor }]}>
              <Icon name={category.icon} size={20} color={category.color} />
            </View>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: '#f8f8f8',
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
    gap: 12,
    paddingBottom: 4,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    flex: 1,
    color: '#222',
    marginLeft: 10,
    fontSize: 13,
    fontWeight: '700',
  },
});
