import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from './styles';
import Imagem from '../components/Imagem';

export default function Login({navigation}){

    const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');

  async function Logar(){
    try {
        // chama a api fara realizar a verificação
        // var response = await fetch('');
        // const json =  response.json();
        // resposta da requisição
        if(true){
            navigation.navigate('usuario')
        }else{
        }
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
   
   
  }
    return(
        <View style={styles.Container}>
        {/* Utilize o componente Imagem para exibir a imagem */}
        <View style={styles.UserImage}>
          <Imagem source={require('../../../assets/planta3.jpg')} style={styles.Image} />
        </View>
        <View style={styles.form}>
                    <TextInput style={styles.input} placeholder='Nome'
                    autoCapitalize='none'
                    maxLength={20}
                    onChangeText={setUserName}
                    value={userName}
                    placeholderTextColor='#000' />
                    <TextInput style={styles.input} placeholder='Senha'
                     autoCapitalize='none' 
                     secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor='#000' />
                    <TouchableOpacity style={styles.buttonSubmit} onPress={Logar} >
                        <Text style={styles.textButton}>ENTRAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('createuser')} >
                        <Text style={styles.ButtonCreate} >CADASTRAR-SE</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
}