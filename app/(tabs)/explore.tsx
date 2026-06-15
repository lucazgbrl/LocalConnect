import { services } from '@/assets/mocks/services_and_stores_mock';
import Logo from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";
import ServiceListItem from '@/components/ServiceListItem';
import type Service from '@/types/service';
import * as Location from 'expo-location';
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { ListRenderItem } from 'react-native';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const INITIAL_SERVICES_COUNT = 6;
const LOAD_MORE_STEP = 4;

export default function ExploreScreen() {
  useEffect(() => {
    async function requestLocationPermission() {
      const Loc: any = Location;
      const currentPermission = await Loc.getForegroundPermissionsAsync?.();

      if (currentPermission?.status === Loc.PermissionStatus?.GRANTED) {
        return;
      }

      if (currentPermission.canAskAgain) {
        await Loc.requestForegroundPermissionsAsync?.();
      }
    }

    requestLocationPermission();
  }, []);

  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'default' | 'distance' | 'rating'>('default');
  const [visibleCount, setVisibleCount] = useState(INITIAL_SERVICES_COUNT);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = services.filter((s) => {
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        (s.tags || []).some((t) => t.toLowerCase().includes(q)) ||
        (s.description || '').toLowerCase().includes(q)
      );
    });

    if (mode === 'distance') {
      list = list.slice().sort((a, b) => (a.distanceMeters ?? Infinity) - (b.distanceMeters ?? Infinity));
    } else if (mode === 'rating') {
      list = list.slice().sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [query, mode]);

  useEffect(() => {
    setVisibleCount(INITIAL_SERVICES_COUNT);
  }, [query, mode]);

  const visibleServices = filtered.slice(0, visibleCount);
  const hasMore = visibleServices.length < filtered.length;
  const handleLoadMore = useCallback(() => {
    if (!hasMore) return;
    setVisibleCount((count) => Math.min(count + LOAD_MORE_STEP, filtered.length));
  }, [hasMore, filtered.length]);

  const listHeader = useMemo(
    () => (
      <>
        <View style={styles.header}>
          <Logo size="small" />
          <Text style={styles.title}>Explore</Text>
        </View>
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search services, tags..." />
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[styles.order_btn, mode === 'distance' && styles.order_btn_active]}
            onPress={() => setMode((m) => (m === 'distance' ? 'default' : 'distance'))}
          >
            <Text style={styles.orderText}>Nearby</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.order_btn, mode === 'rating' && styles.order_btn_active]}
            onPress={() => setMode((m) => (m === 'rating' ? 'default' : 'rating'))}
          >
            <Text style={styles.orderText}>Top Rating</Text>
          </TouchableOpacity>
        </View>
      </>
    ),
    [mode, query]
  );

  const renderItem: ListRenderItem<Service> = useCallback(
    ({ item: service }) => <ServiceListItem service={service} />,
    []
  );

  return (
    <FlatList
      style={styles.scroll}
      contentContainerStyle={[styles.containerInner, { paddingBottom: 40 }]}
      data={visibleServices}
      keyExtractor={(service) => service.id}
      ListHeaderComponent={listHeader}
      ListHeaderComponentStyle={styles.listHeader}
      renderItem={renderItem}
      ListEmptyComponent={<Text style={styles.emptyText}>No results found.</Text>}
      ListFooterComponent={hasMore ? <Text style={styles.loadingText}>Loading more services…</Text> : null}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      initialNumToRender={INITIAL_SERVICES_COUNT}
      maxToRenderPerBatch={4}
      windowSize={5}
      removeClippedSubviews
    />
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  containerInner: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },
  order_btn: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#000",
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  order_btn_active: {
    backgroundColor: '#333',
  },
  orderText: {
    color: '#fff',
    textAlign: 'center',
  },
  itemWrapper: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listHeader: {
    paddingBottom: 24,
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
