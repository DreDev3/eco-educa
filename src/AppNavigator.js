import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login/Index';
import Register from './screens/Register/Index';
import Perfil from './screens/Perfil/Index';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ initialRouteName }) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Perfil" component={Perfil} />
    </Stack.Navigator>
  );
}
