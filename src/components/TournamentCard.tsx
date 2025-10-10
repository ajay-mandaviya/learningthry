import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

const TournamentCard = ({ item, onPress }:any) => {
  const statusColor = item.status === 'ongoing' ? '#00C851' : '#777';
  return (
    <Pressable style={styles.card} onPress={() => onPress?.(item)}>
      <View style={styles.header}>
        <Text style={styles.prize}>₹{item?.prize_amount?.toLocaleString()}</Text>
      </View>

      <View style={styles.content}>
        <Image
          source={{ uri: item?.image_cover_url || item?.image_url }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.org}>By {item?.organizer_name}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>{item?.game_name ||''}</Text>
            <Text style={styles.meta}>• {item?.team_type|| ''}</Text>
            <Text style={styles.meta}>• {new Date(item?.start_date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.statusBox}>
            <Text style={[styles.status, { color: statusColor }]}>{item?.status||''}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.details}>View Details</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  header: { marginBottom: 8 },
  prize: { fontSize: 14, fontWeight: '700', color: '#FF4D94' },
  content: { flexDirection: 'row', alignItems: 'center' },
  image: { width: 100, height: 100, borderRadius: 8, marginRight: 10 },
  info: { flex: 1 },
  title: { color: '#fff', fontSize: 16, fontWeight: '700' },
  org: { color: '#aaa', fontSize: 12, marginVertical: 2 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap' },
  meta: { color: '#bbb', fontSize: 12, marginRight: 5 },
  statusBox: { marginTop: 4 },
  status: { fontSize: 13, fontWeight: '600' },
  footer: { marginTop: 10, alignItems: 'flex-end' },
  details: { color: '#4E9FFF', fontSize: 13, fontWeight: '600' },
});

export default TournamentCard;
