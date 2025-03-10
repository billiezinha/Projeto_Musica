import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { getLyrics } from '../services/lyricsOvhApi';

export default function LyricsScreen({ route }) {
  const { artist, song } = route.params;
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLyrics() {
      const letra = await getLyrics(artist, song);
      setLyrics(letra);
      setLoading(false);
    }

    fetchLyrics();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <Text style={styles.lyrics}>{lyrics}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  lyrics: { fontSize: 16, textAlign: 'center', marginVertical: 20 }
});
