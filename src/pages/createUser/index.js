import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './styles'

export default function CreateUser({navigation}){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    function handleCreateUser(){
        if(name && email && password !== '' && password === passwordConfirm){
            //chame a api para realizar o cadastramento
            navigation.navigate('login')
        }else {
            console.log('Ops! algo errado')
        }
    }
    return(
        <View style={styles.Container}>
                <TextInput style={styles.input} 
                placeholder='Nome'
                 autoCapitalize='none'
                 maxLength={20}
                placeholderTextColor='#000' 
                autoCorrect={false}
                onChangeText={(event) => setName(event)}
                 />
                <TextInput style={styles.input} placeholder='Email'
                autoCapitalize='none' autoCorrect={false}
                maxLength={150}
                placeholderTextColor='#000'
                onChangeText={(event) => setEmail(event)}
                 />
                <TextInput style={styles.input} placeholder='Senha'
                autoCapitalize='none'
                placeholderTextColor='#000' 
                secureTextEntry
                autoCorrect={false}
                onChangeText={(event) => setPassword(event)}
                 />
                <TextInput style={styles.input} 
                placeholder='Confirmar senha'
                 autoCapitalize='none'
                 secureTextEntry
                 autoCorrect={false}
                placeholderTextColor='#000'
                onChangeText={(event) => setPasswordConfirm(event)}
                 />
                <TouchableOpacity style={styles.buttonSubmit}
                onPress={handleCreateUser} >
                    <Text style={styles.textButton}>Cadastrar</Text>
                </TouchableOpacity>
           
        </View>
    );
}