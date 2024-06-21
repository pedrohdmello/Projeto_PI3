import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { styles } from './styles';
import Imagem from '../components/Imagem';

export default function Login({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function Logar() {
    try {
      // chama a api para realizar a verificação
      // var response = await fetch('');
      // const json =  response.json();
      // resposta da requisição
      if (true) {
        navigation.navigate('usuario');
      } else {
        // Tratar erro de login
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.Container} behavior="padding">
      <View style={styles.UserImage}>
        <Imagem source={require('../../../assets/logo.jpg')} style={styles.Image} />
      </View>
      <Text style={styles.welcomeText}>Bem vindo(a)!</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nome'
          autoCapitalize='none'
          maxLength={20}
          onChangeText={setUserName}
          value={userName}
          placeholderTextColor='#000'
        />
        <TextInput
          style={styles.input}
          placeholder='Senha'
          autoCapitalize='none'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor='#000'
        />
        <TouchableOpacity style={styles.buttonSubmit} onPress={Logar}>
          <Text style={styles.textButton}>ENTRAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('createuser')}>
          <Text style={styles.ButtonCreate}>CADASTRAR-SE</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
