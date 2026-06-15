import { services } from '@/assets/mocks/services_and_stores_mock';
import CardService from '@/components/CardService';
import Logo from "@/components/Logo";
import { SearchBar } from "@/components/SearchBar";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


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

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.containerInner, { paddingBottom: 40 }]}
      showsVerticalScrollIndicator={false}
    >
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
          <Text style={styles.orderText}>Perto de mim</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.order_btn, mode === 'rating' && styles.order_btn_active]}
          onPress={() => setMode((m) => (m === 'rating' ? 'default' : 'rating'))}
        >
          <Text style={styles.orderText}>Top rating</Text>
        </TouchableOpacity>

        {/* Removed default button (it simply reset sorting) */}
      </View>

      <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
        {filtered.length === 0 ? (
          <Text>No results found.</Text>
        ) : (
          filtered.map((s) => (
            <View key={s.id} style={{ marginBottom: 12 }}>
              <CardService
                id={s.id}
                title={s.name}
                imageSrc={s.imageSrc}
                rating={s.rating}
                tags={s.tags}
                distanceMeters={s.distanceMeters}
                style={{ width: '100%' }}
              />
            </View>
          ))
        )}
      </View>
    </ScrollView>
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
    marginHorizontal: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#000",
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  order_btn_active: {
    backgroundColor: '#333',
  },
  orderText: {
    color: '#fff',
    textAlign: 'center',
  },
});
