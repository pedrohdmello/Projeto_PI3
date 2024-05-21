import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './styles';
import MainCard from "../components/MainCard";

export default function usuario({ navigation }) {
  const [data, setData] = useState({
    temperatura: '27°C',
    umidade: '66%',
    pressao: '1170 Pa',
    solarizacao: '192 W/m2',
    umidadeSolo: '86%',
    tempRelva: '24°C',
    evapotranspiracao: '3,1 mm',
    NPK: 'N: 0.43%, P: 0.21%, K: 0.64%',
  });

  // async function setCampo() {
  //   try {
  //     const [soilResponse, atmosphereResponse, etoResponse] = await Promise.all([
  //       fetch('http://168.138.248.181:8080/soil'),
  //       fetch('http://168.138.248.181:8080/atmosphere'),
  //       fetch('http://168.138.248.181:8080/samples/eto'),
  //     ]);

  //     if (!soilResponse.ok || !atmosphereResponse.ok || !etoResponse.ok) {
  //       throw new Error('Falha ao buscar dados de uma ou mais APIs');
  //     }

  //     const soilData = await soilResponse.json();
  //     const atmosphereData = await atmosphereResponse.json();
  //     const etoData = await etoResponse.json();

  //     console.log('Soil Data:', soilData);
  //     console.log('Atmosphere Data:', atmosphereData);
  //     console.log('ETO Data:', etoData);

  //     setData({
  //       temperatura: soilData.temperaturaSub || 'N/A',
  //       umidade: atmosphereData.humidity || 'N/A',
  //       pressao: 'N/A', // Ajustar conforme necessário
  //       solarizacao: 'N/A', // Ajustar conforme necessário
  //       umidadeSolo: soilData.umidade_perc || 'N/A',
  //       tempRelva: 'N/A', // Ajustar conforme necessário
  //       evapotranspiracao: 'N/A', // Ajustar conforme necessário
  //       NPK: `N: ${soilData.n_perc}%, P: ${soilData.p_perc}%, K: ${soilData.k_perc}%`,
  //     });
  //   } catch (error) {
  //     console.error('Erro ao buscar dados da API', error);
  //   }
  // }

  // useEffect(() => {
  //   setCampo();
  // }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <MainCard icon='🌞' title={"Temperatura"} texto={data.temperatura} colorTexte={'orange'} />
        <MainCard icon='🌤️' title={"Umidade"} texto={data.umidade} colorTexte={'pink'} />
        <MainCard icon='🌙' title={"Pressão"} texto={data.pressao} colorTexte={'green'} />
        <MainCard icon='🔆' title={"Solarização"} texto={data.solarizacao} colorTexte={'grey'} />
        <MainCard icon='🌱' title={"Umidade do Solo"} texto={data.umidadeSolo} colorTexte={'brown'} />
        <MainCard icon='🌡️' title={"Temp. Relva"} texto={data.tempRelva} colorTexte={'red'} />
        <MainCard icon='💧' title={"Evapotranspiração"} texto={data.evapotranspiracao} colorTexte={'blue'} />
        <MainCard icon='🧪' title={"NPK"} texto={data.NPK} colorTexte={'purple'} />
      </ScrollView>
    </View>
  );
}
