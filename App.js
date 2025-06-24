import React, { useEffect, useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/AppNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setUsuarioLogado(!!token);
      } catch (error) {
        console.error('Erro ao verificar login:', error);
      } finally {
        setCarregando(false);
      }
    };
    verificarLogin();
  }, []);

  if (carregando) {
    return null; // ou uma tela de splash
  }

  return (
    <ImageBackground
      source={require('./assets/images/background.png')}
      style={styles.background}
    >
      <NavigationContainer>
        <AppNavigator usuarioLogado={usuarioLogado} />
      </NavigationContainer>
      <Toast />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
