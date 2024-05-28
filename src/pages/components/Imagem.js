import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Imagem = ({ source, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image source={source} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150, // Ajuste o tamanho do contêiner conforme necessário
    height: 150, // Ajuste o tamanho do contêiner conforme necessário
    borderRadius: 75, // Metade da largura/altura para criar um círculo
    overflow: 'hidden', // Aplica a máscara de círculo
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Preencher completamente o contêiner
  },
});

export default Imagem;
