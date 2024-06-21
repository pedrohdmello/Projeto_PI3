// src/routes/Routes.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import CreateUser from '../pages/createUser';
import Usuario from '../pages/user';
import GraphScreen from '../pages/GraphScreen';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="createuser" component={CreateUser} options={{ title: 'Cadastrar Usuário', headerTintColor: '#FFF', headerTransparent: true }} />
      <Stack.Screen name="usuario" component={Usuario} options={{ title: '', headerTintColor: '#FFF', headerTransparent: true }} />
      <Stack.Screen name="GraphScreen" component={GraphScreen} options={{ title: 'Gráfico', headerTintColor: '#FFF', headerTransparent: true }} />
    </Stack.Navigator>
  );
}
