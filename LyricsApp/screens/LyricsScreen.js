import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LyricsScreen({ route, navigation }) {
  const { artist, song } = route.params;
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      .then(response => {
        setLyrics(response.data.lyrics || 'Letra não encontrada.');
      })
      .catch(() => {
        setLyrics('Erro ao buscar letra.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const saveToFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
      favorites.push({ song, artist, lyrics });
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Música salva nos favoritos!');
    } catch (error) {
      console.error("Erro ao salvar favorito", error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <Text style={styles.lyrics}>{lyrics}</Text>}
      <Button title="Salvar nos Favoritos" onPress={saveToFavorites} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  lyrics: { fontSize: 16, textAlign: 'center', marginVertical: 20 }
});
