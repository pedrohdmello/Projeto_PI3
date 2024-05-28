// import React, { useEffect, useState } from 'react';
// import { ScrollView, View } from 'react-native';
// import { styles } from './styles';
// import MainCard from "../components/MainCard";

// export default function usuario({ navigation }) {
//   const [data, setData] = useState({
//     temperatura: '27°C',
//     umidade: '66%',
//     pressao: '1170 Pa',
//     solarizacao: '192 W/m2',
//     umidadeSolo: '86%',
//     tempRelva: '24°C',
//     evapotranspiracao: '3,1 mm',
//     NPK: 'N: 0.43%, P: 0.21%, K: 0.64%',
//   });

//   async function setCampo() {
//     try {
//       const [soilResponse, atmosphereResponse, etoResponse] = await Promise.all([
//         fetch('http://168.138.248.181:8080/soil'),
//         fetch('http://168.138.248.181:8080/atmosphere'),
//         fetch('http://168.138.248.181:8080/samples/eto'),
//       ]);

//       if (!soilResponse.ok || !atmosphereResponse.ok || !etoResponse.ok) {
//         throw new Error('Falha ao buscar dados de uma ou mais APIs');
//       }

//       const soilData = await soilResponse.json();
//       const atmosphereData = await atmosphereResponse.json();
//       const etoData = await etoResponse.json();

//       console.log('Soil Data:', soilData);
//       console.log('Atmosphere Data:', atmosphereData);
//       console.log('ETO Data:', etoData);

//       setData({
//         temperatura: soilData.temperaturaSub || 'N/A',
//         umidade: atmosphereData.humidity || 'N/A',
//         pressao: 'N/A', // Ajustar conforme necessário
//         solarizacao: 'N/A', // Ajustar conforme necessário
//         umidadeSolo: soilData.umidade_perc || 'N/A',
//         tempRelva: 'N/A', // Ajustar conforme necessário
//         evapotranspiracao: 'N/A', // Ajustar conforme necessário
//         NPK: `N: ${soilData.n_perc}%, P: ${soilData.p_perc}%, K: ${soilData.k_perc}%`,
//       });
//     } catch (error) {
//       console.error('Erro ao buscar dados da API', error);
//     }
//   }

//   useEffect(() => {
//     setCampo();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <MainCard icon='🌞' title={"Temperatura"} texto={data.temperatura} colorTexte={'orange'} />
//         <MainCard icon='🌤️' title={"Umidade"} texto={data.umidade} colorTexte={'pink'} />
//         <MainCard icon='🌙' title={"Pressão"} texto={data.pressao} colorTexte={'green'} />
//         <MainCard icon='🔆' title={"Solarização"} texto={data.solarizacao} colorTexte={'grey'} />
//         <MainCard icon='🌱' title={"Umidade do Solo"} texto={data.umidadeSolo} colorTexte={'brown'} />
//         <MainCard icon='🌡️' title={"Temp. Relva"} texto={data.tempRelva} colorTexte={'red'} />
//         <MainCard icon='💧' title={"Evapotranspiração"} texto={data.evapotranspiracao} colorTexte={'blue'} />
//         <MainCard icon='🧪' title={"NPK"} texto={data.NPK} colorTexte={'purple'} />
//       </ScrollView>
//     </View>
//   );
// }


import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './styles';
import MainCard from "../components/MainCard";

export default function Usuario({ navigation }) { 
  // Definindo o estado inicial dos dados com valores 'N/A'
  const [data, setData] = useState({
    temperaturaSub: 'N/A',
    temperaturaAci: 'N/A',
    umidade_perc: 'N/A',
    n_perc: 'N/A',
    p_perc: 'N/A',
    k_perc: 'N/A',
    humidity: 'N/A',
    pluviometer: 'N/A',
  });

  // Função assíncrona para buscar e atualizar os dados da API
  async function setCampo() {
    try {
      const [soilResponse, atmosphereResponse] = await Promise.all([
        fetch('http://168.138.248.181:8080/soil'), //Requisição de dados do solo
        fetch('http://168.138.248.181:8080/atmosphere') //Requisição para dados da atmosfera
      ]);

      if (!soilResponse.ok || !atmosphereResponse.ok) {
        throw new Error('Falha ao buscar dados de uma ou mais APIs');
      }

      const soilData = await soilResponse.json(); // Convertendo resposta do solo para JSON
      const atmosphereData = await atmosphereResponse.json(); // Convertendo resposta da atmosfera para JSON

      console.log('Soil Data:', soilData);
      console.log('Atmosphere Data:', atmosphereData);

      const latestSoilData = Array.isArray(soilData) ? soilData[soilData.length - 1] : soilData;
      const latestAtmosphereData = Array.isArray(atmosphereData) ? atmosphereData[atmosphereData.length - 1] : atmosphereData;

      // Definindo os dados no estado com os valores mais recentes obtidos da API
      setData({
        temperaturaSub: latestSoilData?.temperaturaSub?.toString() || 'N/A',
        temperaturaAci: latestSoilData?.temperaturaAci?.toString() || 'N/A',
        umidade_perc: latestSoilData?.umidade_perc?.toString() || 'N/A',
        n_perc: latestSoilData?.n_perc?.toString() || 'N/A',
        p_perc: latestSoilData?.p_perc?.toString() || 'N/A',
        k_perc: latestSoilData?.k_perc?.toString() || 'N/A',
        humidity: latestAtmosphereData?.humidity?.toString() || 'N/A',
        pluviometer: latestAtmosphereData?.pluviometer?.toString() || 'N/A',
      });
    } catch (error) {
      console.error('Erro ao buscar dados da API', error);
    }
  }

  useEffect(() => {
    setCampo();
  }, []);

  // Função para formatar os valores com duas casas decimais
  const formatValue = (value, unit) => {
    if (value === 'N/A') return 'N/A';
    return `${parseFloat(value).toFixed(2)} ${unit}`;
  };

  // Formatação dos textos
  const npk = `N: ${formatValue(data.n_perc,'%')}\nP: ${formatValue(data.p_perc,'%')}\nK: ${formatValue(data.k_perc,'%')}`;
  const umidadeSolo = `${formatValue(data.umidade_perc,'%')}`;
  const umidadeAtmosferica = `${formatValue(data.humidity,'%')}`;

  // Retornando a interface com os componentes de MainCard e ScrollView
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <MainCard icon='🌞' title={"Temperatura Subsolo"} texto={`${data.temperaturaSub} °C`} colorTexte={'orange'} />
        <MainCard icon='🌡️' title={"Temperatura Atmosférica"} texto={`${data.temperaturaAci} °C`} colorTexte={'red'} />
        <MainCard icon='☔️' title={"Umidade do Solo"} texto={umidadeSolo} colorTexte={'blue'} />
        <MainCard icon='🌧️' title={"Umidade Atmosférica"} texto={umidadeAtmosferica} colorTexte={'green'} />
        <MainCard icon='🧪' title={"NPK"} texto={npk} colorTexte={'purple'} />
        <MainCard icon='💧' title={"Pluviômetro"} texto={`${data.pluviometer} mm`} colorTexte={'grey'} />
      </ScrollView>
    </View>
  );
}
