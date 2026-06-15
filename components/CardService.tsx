import { useUserStore } from '@/lib/store';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';


interface CardServiceProps {
  id?: string;
  title: string;
  imageSrc: ImageSourcePropType;
  rating: number;
  tags: string[];
  variant?: 'compact' | 'featured';
  style?: ViewStyle;
  distanceMeters?: number;
}

function CardService({
  title,
  id,
  imageSrc,
  rating,
  tags,
  variant = 'compact',
  style,
  distanceMeters,
}: CardServiceProps) {
  const isFeatured = variant === 'featured';

  const user = useUserStore((s) => s.user);
  const toggle = useUserStore((s) => s.toggleFavorite);
  const isFavorited = !!(id && user?.favoriteServiceIds?.includes(id));
  const router = useRouter();

  const handleFavoritePress = useCallback(() => {
    if (!id) return;
    if (!user) {
      router.push('/(tabs)/profile');
      return;
    }
    toggle(id);
  }, [id, router, toggle, user]);

  return (
    <View style={[styles.card, isFeatured && styles.featuredCard, style]}>
      <Image
        source={imageSrc}
        style={[styles.image, isFeatured && styles.featuredImage]}
        contentFit="cover"
      />

      <View style={styles.ratingContainer}>
        <Ionicons name="thumbs-up" size={14} color="#000" />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleFavoritePress}
        accessibilityLabel={isFavorited ? 'Remove favorite' : 'Add favorite'}
      >
        <Ionicons name={isFavorited ? 'heart' : 'heart-outline'} size={18} color={isFavorited ? '#ff4d4f' : '#fff'} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          {typeof distanceMeters === 'number' && (
            <Text style={styles.distanceText}>{formatDistance(distanceMeters)}</Text>
          )}
          {tags && (
            <View style={styles.tags}>
              {tags.map((tag, index) => (
                <Text key={index} style={styles.tag} numberOfLines={1}>
                  {tag}
                </Text>
              ))}
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function formatDistance(meters: number) {
  if (meters < 1000) return `${meters} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export default React.memo(CardService);

const styles = StyleSheet.create({
  card: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featuredCard: {
    width: '100%',
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  featuredImage: {
    aspectRatio: 1.85,
  },
  ratingContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    opacity: 0.7,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 8,
    borderRadius: 18,
    zIndex: 10,
  },
  content: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  details: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tags: {
    flexDirection: 'row',
    marginVertical: 4,
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: 12,
    color: '#555',
    marginRight: 10,
    maxWidth: '100%',
  },
  button: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    flexShrink: 0,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  distanceText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
