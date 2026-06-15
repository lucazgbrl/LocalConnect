
import { services } from '@/assets/mocks/services_and_stores_mock';
import CardService from '@/components/CardService';
import { useUserStore } from '@/lib/store';
import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';

export default function FavoritesScreen() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const favoriteServices = useMemo(() => {
    if (!user?.favoriteServiceIds || user.favoriteServiceIds.length === 0) {
      return [];
    }
    return services.filter((service) =>
      user.favoriteServiceIds!.includes(service.id)
    );
  }, [user?.favoriteServiceIds]);

  const handleRemoveFavorite = (serviceId: string) => {
    if (!user) return;
    const updated = user.favoriteServiceIds?.filter((id) => id !== serviceId) || [];
    setUser({
      ...user,
      favoriteServiceIds: updated,
    });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{favoriteServices.length}</Text>
        </View>
      </View>

      {favoriteServices.length === 0 ? (
        <ScrollView
          contentContainerStyle={styles.emptyContainer}
          scrollEnabled={false}
        >
          <View style={styles.emptyContent}>
            <FontAwesome name="heart-o" size={60} color="#ccc" />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptySubtitle}>
              Start adding your favorite services to see them here
            </Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          {favoriteServices.map((service) => (
            <View key={service.id} style={styles.serviceWrapper}>
              <CardService
                title={service.name}
                imageSrc={service.imageSrc}
                rating={service.rating}
                tags={service.tags}
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFavorite(service.id)}
              >
                <Icon name="close" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  badge: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 16,
  },
  serviceWrapper: {
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff4d4f',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  emptyContent: {
    alignItems: 'center',
    gap: 12,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    maxWidth: 280,
  },
});
