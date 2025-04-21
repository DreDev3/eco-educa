import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

export default function Mapa({ onClose }) {
  const [location, setLocation] = useState(null);
  const [ecoPontos, setEcoPontos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Permita o acesso à localização.');
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      setLocation({ latitude, longitude });

      buscarEcoPontos(latitude, longitude);
    })();
  }, []);

  const buscarEcoPontos = async (lat, lon) => {
    try {
      const radius = 5000; // em metros
      const overpassQuery = `
        [out:json];
        (
          node["amenity"="recycling"](around:${radius},${lat},${lon});
          node["recycling_type"="centre"](around:${radius},${lat},${lon});
        );
        out body;
      `;

      const response = await axios.post(
        'https://overpass-api.de/api/interpreter',
        overpassQuery,
        { headers: { 'Content-Type': 'text/plain' } }
      );

      const pontos = await Promise.all(
        response.data.elements.map(async (element) => {
          const name = element.tags?.name || 'Eco-ponto';
          const latitude = element.lat;
          const longitude = element.lon;

          // Reverse geocoding para obter o endereço completo
          let address = 'Endereço não disponível';
          try {
            const [geo] = await Location.reverseGeocodeAsync({ latitude, longitude });
            address = `${geo.street || ''}, ${geo.city || ''}`.trim().replace(/^,|,$/g, '');
          } catch (e) {
            console.error('Erro no reverse geocoding:', e);
          }

          return { id: element.id, latitude, longitude, name, address };
        })
      );

      setEcoPontos(pontos);
    } catch (error) {
      console.error('Erro ao buscar eco-pontos:', error);
      Alert.alert('Erro', 'Não foi possível buscar eco-pontos.');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoVoltar} onPress={onClose}>
        <Text style={styles.textoVoltar}>← Voltar</Text>
      </TouchableOpacity>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Você está aqui"
          pinColor="blue"
        />

        {ecoPontos.map((ponto) => (
          <Marker
            key={ponto.id}
            coordinate={{
              latitude: ponto.latitude,
              longitude: ponto.longitude,
            }}
            title={ponto.name}
            description={ponto.address || 'Endereço não disponível'}
            image={require('../../../assets/images/reduce.png')}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  botaoVoltar: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  textoVoltar: {
    fontSize: 16,
    color: '#007AFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
