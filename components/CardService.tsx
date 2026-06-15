import { useUserStore } from '@/lib/store';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { ImageSourcePropType, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';


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

function getDefaultDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date;
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function formatFullDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getDefaultDate());
  const [confirmationText, setConfirmationText] = useState('');

  const bookingDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      return date;
    });
  }, []);

  const handleFavoritePress = useCallback(() => {
    if (!id) return;
    if (!user) {
      router.push('/(tabs)/profile');
      return;
    }
    toggle(id);
  }, [id, router, toggle, user]);

  const openBookingModal = useCallback(() => {
    setSelectedDate(getDefaultDate());
    setModalVisible(true);
  }, []);

  const closeBookingModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleSchedule = useCallback(() => {
    setConfirmationText(`Visit scheduled for ${formatFullDate(selectedDate)}`);
    setModalVisible(false);
  }, [selectedDate]);

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
          {confirmationText ? (
            <Text style={styles.confirmationText}>{confirmationText}</Text>
          ) : null}
        </View>
        <TouchableOpacity style={styles.button} onPress={openBookingModal} accessibilityLabel="Open booking modal">
          <Text style={styles.buttonText}>Book now</Text>
        </TouchableOpacity>
      </View>

      <Modal transparent animationType="slide" visible={modalVisible} onRequestClose={closeBookingModal}>
        <Pressable style={styles.modalOverlay} onPress={closeBookingModal}>
          <Pressable style={[styles.modalContainer, isFeatured && styles.featuredModal]} onPress={(event) => event.stopPropagation()}>
            <Text style={styles.modalTitle}>Schedule a visit</Text>
            <Text style={styles.modalSubtitle}>Choose a date for your appointment</Text>
            <View style={styles.calendarGrid}>
              {bookingDates.map((date) => {
                const selected = isSameDay(date, selectedDate);
                return (
                  <TouchableOpacity
                    key={date.toISOString()}
                    style={[styles.dateButton, selected && styles.dateButtonSelected]}
                    onPress={() => setSelectedDate(date)}
                  >
                    <Text style={[styles.dateShort, selected && styles.dateTextSelected]}>
                      {date.toLocaleDateString('en-US', { weekday: 'short' })}
                    </Text>
                    <Text style={[styles.dateDay, selected && styles.dateTextSelected]}>
                      {date.getDate()}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeBookingModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.scheduleButton} onPress={handleSchedule}>
                <Text style={styles.scheduleButtonText}>Schedule Visit</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
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
  confirmationText: {
    marginTop: 10,
    color: '#0a7d4f',
    fontSize: 12,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 18,
    backgroundColor: '#fff',
    padding: 20,
  },
  featuredModal: {
    maxWidth: 560,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  dateButton: {
    width: '30%',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  dateButtonSelected: {
    backgroundColor: '#000',
  },
  dateShort: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#333',
  },
  dateDay: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#111',
  },
  dateTextSelected: {
    color: '#fff',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  scheduleButton: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
