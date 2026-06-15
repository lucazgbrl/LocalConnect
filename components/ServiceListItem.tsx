import CardService from '@/components/CardService';
import Service from '@/types/service';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ServiceListItemProps {
  service: Service;
}

function ServiceListItem({ service }: ServiceListItemProps) {
  return (
    <View style={styles.wrapper}>
      <CardService
        id={service.id}
        title={service.name}
        imageSrc={service.imageSrc}
        rating={service.rating}
        tags={service.tags}
        distanceMeters={service.distanceMeters}
        style={{ width: '100%' }}
      />
    </View>
  );
}

export default React.memo(ServiceListItem, (prev, next) => prev.service === next.service);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
});
