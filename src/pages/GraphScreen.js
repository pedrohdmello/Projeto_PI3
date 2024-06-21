// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
// import { Dimensions } from 'react-native';

// const screenWidth = Dimensions.get('window').width;

// export default function GraphScreen({ route }) {
//   const { title, apiUrl, key, unit } = route.params;
//   const [data, setData] = useState([]);
//   const [labels, setLabels] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(apiUrl);
//         const json = await response.json();
//         const values = json.slice(-7).map(item => item[key]); // Pegue as últimas 7 leituras
//         const dates = json.slice(-7).map(item => {
//           const date = item.dataHora.slice(0, 10); // Pegue a data (YYYY-MM-DD)
//           const time = item.dataHora.slice(11, 16); // Pegue a hora (HH:MM)
//           return `${date} ${time}`;
//         });
//         setData(values);
//         setLabels(dates);
//       } catch (error) {
//         console.error('Erro ao buscar dados da API:', error);
//       }
//     }

//     fetchData();
//   }, [apiUrl, key]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{title}</Text>
//       {data.length > 0 ? (
//         <LineChart
//           data={{
//             labels: labels,
//             datasets: [
//               {
//                 data: data,
//               },
//             ],
//           }}
//           width={screenWidth - 16} // from react-native
//           height={500}
//           yAxisLabel=""
//           yAxisSuffix={` ${unit}`}
//           yAxisInterval={1} // Opcional, pode ajustar a densidade das linhas horizontais
//           fromZero={true}
//           chartConfig={{
//             backgroundColor: '#e26a00',
//             backgroundGradientFrom: '#bdecb6',
//             backgroundGradientTo: '#bdecb6',
//             decimalPlaces: 2, // optional, defaults to 2dp
//             color: (opacity = 1) => `rgba(32, 178, 170, ${opacity})`,
//             labelColor: (opacity = 1) => `rgba(28, 47, 45, ${opacity})`,
//             style: {
//               borderRadius: 16,
//             },
//             propsForDots: {
//               r: '6',
//               strokeWidth: '2',
//               stroke: '#000',
//             },
//             propsForBackgroundLines: {
//               strokeDasharray: "", // solid background lines with no dashes
//             },
//           }}
//           bezier
//           style={{
//             marginVertical: 8,
//             borderRadius: 16,
//           }}
//           verticalLabelRotation={90}
//           xLabelsOffset={-15}
//           yLabelsOffset={10}
//         />
//       ) : (
//         <Text style={styles.loadingText}>Carregando dados...</Text>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1C2F2D', // Fundo escuro
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 16,
//     color: '#fff', // Texto branco para contraste
//   },
//   loadingText: {
//     color: '#fff', // Texto branco para a mensagem de carregamento
//   },
// });

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

export default function GraphScreen({ route }) {
  const { title, apiUrl, key, unit } = route.params;
  const [data, setData] = useState(null);
  const [labels, setLabels] = useState([]);
  const [clickedValue, setClickedValue] = useState(null);
  const [selectedReading, setSelectedReading] = useState(null);
  const [npkReadings, setNpkReadings] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();

        if (key === 'npk') {
          const latestReadings = json.slice(-7).reverse();
          setNpkReadings(latestReadings);
          const initialReading = latestReadings[0];
          const nValues = parseFloat((initialReading.n_perc * 10).toFixed(1));
          const pValues = parseFloat((initialReading.p_perc * 10).toFixed(1));
          const kValues = parseFloat((initialReading.k_perc * 10).toFixed(1));

          setSelectedReading(initialReading);
          setData([
            { name: '(Nitrogênio)', value: nValues, color: '#0fa697', legendFontColor: '#fff', legendFontSize: 15 },
            { name: '(Fósforo)', value: pValues, color: '#45ac42', legendFontColor: '#fff', legendFontSize: 15 },
            { name: '(Potássio)', value: kValues, color: '#3b784e', legendFontColor: '#fff', legendFontSize: 15 }
          ]);
        } else {
          const values = json.slice(-7).map(item => item[key]);
          const dates = json.slice(-7).map(item => {
            const date = item.dataHora.slice(0, 10);
            const time = item.dataHora.slice(11, 16);
            return `${date} ${time}`;
          });
          setData(values);
          setLabels(dates);
        }
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    }

    fetchData();
  }, [apiUrl, key]);

  const handleReadingChange = (reading) => {
    setSelectedReading(reading);
    const nValues = parseFloat((reading.n_perc * 10).toFixed(1));
    const pValues = parseFloat((reading.p_perc * 10).toFixed(1));
    const kValues = parseFloat((reading.k_perc * 10).toFixed(1));

    setData([
      { name: '(Nitrogênio)', value: nValues, color: '#0fa697', legendFontColor: '#fff', legendFontSize: 15 },
      { name: '(Fósforo)', value: pValues, color: '#45ac42', legendFontColor: '#fff', legendFontSize: 15 },
      { name: '(Potássio)', value: kValues, color: '#3b784e', legendFontColor: '#fff', legendFontSize: 15 }
    ]);
  };

  const renderChart = () => {
    if (key === 'npk' && data) {
      return (
        <View>
          <PieChart
            data={data}
            width={screenWidth - 16}
            height={250}
            chartConfig={{
              backgroundColor: '#1C2F2D',
              backgroundGradientFrom: '#1C2F2D',
              backgroundGradientTo: '#1C2F2D',
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <Picker
            selectedValue={selectedReading}
            onValueChange={(itemValue) => handleReadingChange(itemValue)}
            style={{ color: '#fff' }} // Estilizando a cor da barra de seleção
            dropdownIconColor="#fff"
          >
            <Picker.Item label="Selecione uma leitura" value={null} />
            {npkReadings.map((reading, index) => (
              <Picker.Item
                key={index}
                label={`${reading.dataHora.slice(0, 10)} ${reading.dataHora.slice(11, 16)}`}
                value={reading}
              />
            ))}
          </Picker>
        </View>
      );
    } else if (data) {
      return (
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data: data }],
          }}
          width={screenWidth - 16}
          height={550}
          yAxisLabel=""
          yAxisSuffix={` ${unit}`}
          yAxisInterval={1}
          fromZero={true}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#bdecb6',
            backgroundGradientTo: '#bdecb6',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(32, 178, 170, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(28, 47, 45, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{
            marginVertical: 7,
            borderRadius: 16,
          }}
          verticalLabelRotation={90}
          onDataPointClick={(data) => {
            const { value, x, y } = data;
            if (typeof x === 'number' && typeof y === 'number' && !isNaN(x) && !isNaN(y)) {
              setClickedValue({ value, x, y });
            }
          }}
          decorator={() => {
            if (clickedValue) {
              const { x, y, value } = clickedValue;
              const adjustedY = y > 40 ? y - 40 : y + 10; // Ajustar para garantir que o texto não saia da tela
              const displayText = `${value} ${unit}`;

              return (
                <Svg>
                  <Rect
                    x={x - 30}
                    y={adjustedY - 10}
                    width="60"
                    height="24"
                    fill="rgba(32, 178, 170, 0.8)"
                    rx="5"
                    ry="5"
                  />
                  <SvgText
                    x={x}
                    y={adjustedY + 5}
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {displayText}
                  </SvgText>
                </Svg>
              );
            }
            return null;
          }}
        />
      );
    } else {
      return <Text style={styles.loadingText}>Carregando dados...</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {renderChart()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C2F2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    color: '#fff',
  },
  loadingText: {
    color: '#fff',
  },
  picker: {
    height: 50,
    width: 150,
    color: '#fff',
  },
});






