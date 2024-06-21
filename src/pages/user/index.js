import React, { useEffect, useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import MainCard from "../components/MainCard";

export default function Usuario({ navigation }) {
  const [data, setData] = useState({
    temperaturaSub: 'N/A',
    temperaturaAci: 'N/A',
    umidade_perc: 'N/A',
    n_perc: 'N/A',
    p_perc: 'N/A',
    k_perc: 'N/A',
    humidity: 'N/A',
    pluviometer: 'N/A',
    evapotranspiracao: 'N/A',
  });

  async function setCampo() {
    try {
      const [soilResponse, atmosphereResponse, etoResponse] = await Promise.all([
        fetch('http://168.138.248.181:8080/soil'),
        fetch('http://168.138.248.181:8080/atmosphere'),
        fetch('http://168.138.248.181:8080/samples/eto')
      ]);

      if (!soilResponse.ok || !atmosphereResponse.ok) {
        throw new Error('Falha ao buscar dados de uma ou mais APIs');
      }

      const soilData = await soilResponse.json();
      const atmosphereData = await atmosphereResponse.json();
      const etoData = await etoResponse.json();

      const latestSoilData = Array.isArray(soilData) ? soilData[soilData.length - 1] : soilData;
      const latestAtmosphereData = Array.isArray(atmosphereData) ? atmosphereData[atmosphereData.length - 1] : atmosphereData;
      const latestEtoData = Array.isArray(etoData) ? etoData[etoData.length - 1] : etoData;

      const umidadePerc = latestSoilData?.umidade_perc ? latestSoilData.umidade_perc * 1 : 'N/A';
      const nPerc = latestSoilData?.n_perc ? latestSoilData.n_perc * 10 : 'N/A';
      const pPerc = latestSoilData?.p_perc ? latestSoilData.p_perc * 10 : 'N/A';
      const kPerc = latestSoilData?.k_perc ? latestSoilData.k_perc * 10 : 'N/A';

      setData({
        temperaturaSub: latestSoilData?.temperaturaSub?.toString() || 'N/A',
        temperaturaAci: latestSoilData?.temperaturaAci?.toString() || 'N/A',
        umidade_perc: umidadePerc.toString(),
        n_perc: nPerc.toString(),
        p_perc: pPerc.toString(),
        k_perc: kPerc.toString(),
        humidity: latestAtmosphereData?.humidity?.toString() || 'N/A',
        pluviometer: latestAtmosphereData?.pluviometer?.toString() || 'N/A',
        evapotranspiracao: latestEtoData?.value?.toString() || 'N/A',
      });
    } catch (error) {
      console.error('Erro ao buscar dados da API', error);
    }
  }

  useEffect(() => {
    setCampo();
  }, []);

  const formatValue = (value, unit) => {
    if (value === 'N/A') return 'N/A';
    return `${parseFloat(value).toFixed(1)} ${unit}`;
  };

  const npk = `N: ${formatValue(data.n_perc,'%')}\nP: ${formatValue(data.p_perc,'%')}\nK: ${formatValue(data.k_perc,'%')}`;
  const umidadeSolo = `${formatValue(data.umidade_perc,'%')}`;
  const umidadeAtmosferica = `${formatValue(data.humidity,'%')}`;
  const evapotranspiracao = `${formatValue(data.evapotranspiracao, 'mm')}`;

  const handleCardPress = (title, apiUrl, key, unit) => {
    navigation.navigate('GraphScreen', { title, apiUrl, key, unit });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => handleCardPress('Temperatura Solo', 'http://168.138.248.181:8080/soil', 'temperaturaSub', '°C')}>
            <MainCard icon='🌞' title={"Temperatura Solo"} texto={`${data.temperaturaSub} °C`} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCardPress('Temperatura Atmosférica', 'http://168.138.248.181:8080/soil', 'temperaturaAci', '°C')}>
            <MainCard icon='🌡️' title={"Temperatura Atmosférica"} texto={`${data.temperaturaAci} °C`} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCardPress('Umidade do Solo', 'http://168.138.248.181:8080/soil', 'umidade_perc', '%')}>
            <MainCard icon='💧' title={"Umidade do Solo"} texto={umidadeSolo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCardPress('Umidade Atmosférica', 'http://168.138.248.181:8080/atmosphere', 'humidity', '%')}>
            <MainCard icon='🌧️' title={"Umidade Atmosférica"} texto={umidadeAtmosferica} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCardPress('NPK', 'http://168.138.248.181:8080/soil', 'npk', '%')}>
            <MainCard icon='🧪' title={"NPK"} texto={npk} colorTexte={'purple'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCardPress('Pluviômetro', 'http://168.138.248.181:8080/atmosphere', 'pluviometer', 'mm')}>
            <MainCard icon='☔️' title={"Pluviômetro"} texto={`${data.pluviometer} mm`} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCardPress('ETo', 'http://168.138.248.181:8080/samples/eto', 'value', 'mm')}>
            <MainCard icon='💦' title={"ETo"} texto={evapotranspiracao} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
