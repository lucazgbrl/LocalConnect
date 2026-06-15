import { services } from '@/assets/mocks/services_and_stores_mock';
import CardCategories from '@/components/CardCategories';
import CardService from '@/components/CardService';
import CardUser from '@/components/CardUser';
import { useUserStore } from '@/lib/store';
import ListServices from '@/components/ListServices';
import { SearchBar } from '@/components/SearchBar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const user = useUserStore((state) => state.user);
  return (
    <>
      <View style={styles.header}>
        <CardUser
          userName={user?.name ?? 'Guest'}
          profileImageUrl={user?.profileImageUrl}
        />
        <TouchableOpacity>
          <IconSymbol name="menu.fill" size={24} color="#black" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
          <SearchBar />
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>
              Featured Merchant
            </Text>
            <CardService
              title={services[0].name}
              imageSrc={services[0].imageSrc}
              rating={services[0].rating}
              tags={services[0].tags}
              variant="featured"
            />
          </View>
          <CardCategories />
          <ListServices contentPaddingHorizontal={0} orientation="vertical" />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
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
    maxWidth: 720,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
