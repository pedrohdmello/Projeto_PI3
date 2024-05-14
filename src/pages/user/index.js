import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useEffect} from 'react'
import { styles } from './styles';
import MainCard from "../components/MainCard"


export default function usuario({navigation}) {
  
  async function setCampo(){
    //aqui chama a api que ira preencher as view
  }


  useEffect(() => {
    setCampo()
  }, [])

  
  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <MainCard icon='🌞' title={"Temperatura"} texto={"27°"} colorTexte={'orange'} />
      <MainCard icon='🌤️' title={"Umidade"} texto={"66%"} colorTexte={'blue'} />
      <MainCard icon='🌙' title={"Pressão"} texto={"1170 Pa"} colorTexte={'green'} />
      <MainCard icon='🔆' title={"Solarização"} texto={"192 W/m2"} colorTexte={'grey'} />
      <MainCard icon='🌱' title={"Umidade do Solo"} texto={"86%"} colorTexte={'brown'} />
      <MainCard icon='🌡️' title={"Temp. Relva"} texto={"24ºC"} colorTexte={'red'} />
    </ScrollView> 
    </View>
  );
}