import { services } from '@/assets/mocks/services_and_stores_mock';
import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native';
import CardService from './CardService';

type ListServicesProps = {
  contentPaddingHorizontal?: number;
  orientation?: 'horizontal' | 'vertical';
};

export default function ListServices({
  contentPaddingHorizontal = 20,
  orientation = 'horizontal',
}: ListServicesProps) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(Math.max(width * 0.76, 260), 380);

  if (orientation === 'vertical') {
    return (
      <View
        style={[
          styles.verticalContainer,
          { paddingHorizontal: contentPaddingHorizontal },
        ]}
      >
        {services.map((item) => (
          <CardService
            key={item.id}
            title={item.name}
            imageSrc={item.imageSrc}
            rating={item.rating}
            tags={item.tags}
            style={styles.verticalCard}
          />
        ))}
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingHorizontal: contentPaddingHorizontal },
      ]}
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
          style={{ width: cardWidth }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 0,
    backgroundColor: '#f8f8f8',
  },
  content: {
    alignItems: 'flex-start',
    paddingBottom: 20,
    gap: 16,
  },
  verticalContainer: {
    width: '100%',
    maxWidth: 720,
    gap: 16,
  },
  verticalCard: {
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
