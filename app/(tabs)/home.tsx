import { services } from '@/assets/mocks/services_and_stores_mock';
import CardCategories from '@/components/CardCategories';
import CardService from '@/components/CardService';
import CardUser from '@/components/CardUser';
import Logo from '@/components/Logo';
import { useUserStore } from '@/lib/store';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();

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
        <ScrollView contentContainerStyle={styles.container}>
          {/* SearchBar removed from Home (now in Explore) */}
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
              style={{ width: '100%' }}
            />
          </View>
            <CardCategories />
            <View style={styles.servicesList}>
              {services.map((service) => (
                <View key={service.id} style={styles.serviceWrapper}>
                  <CardService
                    title={service.name}
                    imageSrc={service.imageSrc}
                    rating={service.rating}
                    tags={service.tags}
                    style={{ width: '100%' }}
                  />
                </View>
              ))}
            </View>
      </ScrollView>
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
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});
