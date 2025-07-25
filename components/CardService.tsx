import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


interface CardServiceProps {
  title: string;
  imageSrc: string;
  rating: number;
  tags: string[];
}

export default function CardService({ title, imageSrc, rating, tags }: CardServiceProps) {
  return (
    <View style={styles.card}>
      <Image
        source={imageSrc}
        style={styles.image}
      />

      <View style={styles.ratingContainer}>
        <Icon name="thumbs-up" size={14} color="#000" />
        <Text style={styles.ratingText}>{rating}</Text>
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>{title}</Text>
          {tags && (
            <View style={styles.tags}>
              {tags.map((tag, index) => (
                <Text key={index} style={styles.tag}>
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

const styles = StyleSheet.create({
  card: {
    width: 300,
    marginRight: 15,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 150,
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
  content: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
