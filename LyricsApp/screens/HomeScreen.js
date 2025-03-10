import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');

  const searchLyrics = () => {
    if (artist && song) {
      navigation.navigate('Lyrics', { artist, song });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Artista:</Text>
      <TextInput style={styles.input} value={artist} onChangeText={setArtist} placeholder="Ex: Coldplay" />
      
      <Text style={styles.label}>Música:</Text>
      <TextInput style={styles.input} value={song} onChangeText={setSong} placeholder="Ex: Yellow" />
      
      <Button title="Buscar Letra" onPress={searchLyrics} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 18, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});
