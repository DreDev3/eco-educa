import React from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text
}
  from "react-native";

export default function Perfil({ onClose }) {
  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      resizeMode="cover"
      style={styles.background}>
      <View style={styles.container}>

        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  closeText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});