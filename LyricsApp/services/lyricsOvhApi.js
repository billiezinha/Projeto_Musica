import axios from 'axios';

export const getLyrics = async (artist, song) => {
  try {
    const response = await axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`);
    return response.data.lyrics || 'Letra não encontrada.';
  } catch (error) {
    console.error('Erro ao buscar a letra:', error);
    return 'Erro ao buscar letra.';
  }
};
