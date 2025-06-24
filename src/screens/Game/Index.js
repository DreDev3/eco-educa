import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function GameScreen() {
  return (
    <View style={styles.container}>
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
});