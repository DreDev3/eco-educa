import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function GameScreen({ onClose }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botaoVoltar} onPress={onClose}>
        <Text style={styles.textoVoltar}>← Voltar</Text>
      </TouchableOpacity>
      <WebView
        source={{ uri: 'https://eco-educa.vercel.app' }}
        androidLayerType="hardware" // 💡 força o uso de GPU
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        mixedContentMode="always" // 🔓 desbloqueia conteúdo misto
        allowsInlineMediaPlayback={true}
        originWhitelist={['*']}
        style={{ flex: 1 }}
        onError={e => console.warn('WebView Error', e.nativeEvent)}
        onHttpError={e => console.warn('WebView HTTP Error', e.nativeEvent)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#8C472E',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  textoVoltar: {
    fontFamily: 'Jersey10',
    fontSize: 26,
    color: '#fff',
  },
});