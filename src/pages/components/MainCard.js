import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MainCard({ icon, title, texto }) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#90ee90',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000', // Cor da borda preta
    padding: 20,
    margin: 10,
    width: 160, // Defina a largura desejada dos cards
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginTop: 70,
  },
  icon: {
    fontSize: 40,
    color: '#000', // Cor do ícone preta
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000', // Cor do título preta
  },
  text: {
    fontSize: 16,
    color: '#000', // Cor do texto preta
  },
});
