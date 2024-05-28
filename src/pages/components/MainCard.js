// import React from "react";
// import { StyleSheet, Text, View } from 'react-native'
// import { Feather } from '@expo/vector-icons'
// import { Fontisto } from '@expo/vector-icons'

// const MainCard = ({ icon, title, texto, colorTexte }) => {
//   return (
//     <View style={[styles.card, { width: '80%' }]}>
//       <Text style={[styles.icon, { color: colorTexte }]}>{icon}</Text>
//       <Text style={styles.title}>{title}</Text>
//       <Text style={[styles.text, { color: colorTexte }]}>{texto}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     margin: 10,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     alignItems: 'center',
//     width: 250, // Ajuste conforme necessário
//   },
//   icon: {
//     fontSize: 20, // Aumente o tamanho do ícone se necessário
//   },
//   title: {
//     fontSize: 15, // Aumente o tamanho do título
//     marginVertical: 10,
//   },
//   text: {
//     fontSize: 20, // Aumente o tamanho do texto principal
//   },
// });

// export default MainCard;


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MainCard({ icon, title, texto, colorTexte }) {
  return (
    <View style={[styles.card, { borderColor: colorTexte }]}>
      <Text style={[styles.icon, { color: colorTexte }]}>{icon}</Text>
      <Text style={[styles.title, { color: colorTexte }]}>{title}</Text>
      <Text style={styles.text}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    padding: 20,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
  },
});
