import { services } from '@/assets/mocks/services_and_stores_mock';
import CardCategories from '@/components/CardCategories';
import CardService from '@/components/CardService';
import CardUser from '@/components/CardUser';
import Logo from '@/components/Logo';
import ServiceListItem from '@/components/ServiceListItem';
import { useUserStore } from '@/lib/store';
import type Service from '@/types/service';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ListRenderItem } from 'react-native';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const INITIAL_SERVICES_COUNT = 6;
const LOAD_MORE_STEP = 4;

export default function HomeScreen() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_SERVICES_COUNT);

  useEffect(() => {
    setVisibleCount(INITIAL_SERVICES_COUNT);
  }, [selectedCategory]);

  const categoryKeyFor = (categoryName: string | null) => {
    if (!categoryName) return null;
    const key = categoryName.toLowerCase();
    return key.endsWith('s') ? key.slice(0, -1) : key;
  };

  const selectedKey = categoryKeyFor(selectedCategory);
  const filteredServices = useMemo(
    () =>
      selectedKey
        ? services.filter((s) => s.tags.some((t) => t.toLowerCase().includes(selectedKey)))
        : services,
    [selectedKey]
  );

  const visibleServices = filteredServices.slice(0, visibleCount);
  const hasMore = visibleServices.length < filteredServices.length;

  const handleLoadMore = useCallback(() => {
    if (!hasMore) return;
    setVisibleCount((count) => Math.min(count + LOAD_MORE_STEP, filteredServices.length));
  }, [hasMore, filteredServices.length]);

  const listHeader = useMemo(
    () => (
      <>
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Merchant</Text>
          <CardService
            id={services[0].id}
            title={services[0].name}
            imageSrc={services[0].imageSrc}
            rating={services[0].rating}
            tags={services[0].tags}
            variant="featured"
            style={{ width: '100%' }}
          />
        </View>
        <CardCategories selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
      </>
    ),
    [selectedCategory]
  );

  const renderItem: ListRenderItem<Service> = useCallback(
    ({ item: service }) => <ServiceListItem service={service} />,
    []
  );

  return (
    <>
      <View style={styles.header}>
        <CardUser
          userName={user?.name ?? 'Guest'}
          profileImageUrl={user?.profileImageUrl}
          onPress={() => router.push('/(tabs)/profile')}
        />
        <Logo size="small" />
      </View>
      <FlatList
        data={visibleServices}
        keyExtractor={(service) => service.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={listHeader}
        ListHeaderComponentStyle={styles.listHeader}
        ListFooterComponent={hasMore ? <Text style={styles.loadingText}>Loading more services…</Text> : null}
        ListEmptyComponent={<Text style={styles.emptyText}>No services found.</Text>}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        initialNumToRender={INITIAL_SERVICES_COUNT}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
    gap: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  featuredSection: {
    width: '100%',
    paddingHorizontal: 20,
  },
  servicesList: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 16,
  },
  serviceWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  listHeader: {
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  loadingText: {
    width: '100%',
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
    marginBottom: 20,
  },
  emptyText: {
    width: '100%',
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});
