import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

export default function Logo({ size = 'medium', showText = false }: LogoProps) {
  const sizeMap = {
    small: 36,
    medium: 56,
    large: 80,
  };

  const fontSize = {
    small: 11,
    medium: 14,
    large: 20,
  };

  const currentSize = sizeMap[size];
  const currentFontSize = fontSize[size];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.logoBox,
          { width: currentSize, height: currentSize },
        ]}
      >
        {/* Background with gradient-like effect */}
        <View style={styles.innerCircle}>
          {/* Map pin representing location */}
          <Icon name="location-on" size={currentSize * 0.55} color="#fff" />
        </View>
        
        {/* Decorative connection dots */}
        <View
          style={[
            styles.dot,
            {
              width: currentSize * 0.12,
              height: currentSize * 0.12,
              top: '8%',
              right: '12%',
            },
          ]}
        />
        <View
          style={[
            styles.dot,
            {
              width: currentSize * 0.12,
              height: currentSize * 0.12,
              bottom: '12%',
              left: '8%',
            },
          ]}
        />
      </View>

      {showText && (
        <View style={styles.textContainer}>
          <Text style={[styles.appName, { fontSize: currentFontSize }]}>
            LocalConnect
          </Text>
          <Text style={[styles.tagline, { fontSize: currentFontSize * 0.7 }]}>
            Economia Local
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  logoBox: {
    backgroundColor: '#FF6B35',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: '#FFD60A',
    borderRadius: 999,
    position: 'absolute',
  },
  textContainer: {
    alignItems: 'center',
    gap: 2,
  },
  appName: {
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.5,
  },
  tagline: {
    fontWeight: '500',
    color: '#666',
  },
});
