import { services } from '@/assets/mocks/services_and_stores_mock';
import { FlatList, StyleSheet } from 'react-native';
import CardService from './CardService';

export default function ListServices() {
  return (
    <FlatList
      style={styles.container}
      data={services}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <CardService
          title={item.name}
          imageSrc={item.imageSrc}
          rating={item.rating}
          tags={item.tags}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 20,
    backgroundColor: '#f8f8f8',
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
