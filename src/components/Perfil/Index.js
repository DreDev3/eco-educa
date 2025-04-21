import React, { useState, useRef } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Animated,
  Modal,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

import Mapa from "../Mapa/Index";

export default function Perfil({ onClose }) {
  const [name, setName] = useState("Usuario");
  const [mapVisible, setMapVisible] = useState(false);
  const [modalMapaVisible, setModalMapaVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-300)).current;

  const toggleMenu = () => {
    Animated.timing(sidebarAnim, {
      toValue: menuVisible ? -300 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setMenuVisible(!menuVisible);
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      resizeMode="cover"
      style={styles.background}
    >
      {/* Botão de menu */}
      <TouchableOpacity style={styles.menuBtn} onPress={toggleMenu}>
        <Ionicons
          name={menuVisible ? "close" : "menu"}
          size={28}
          color="white"
        />
      </TouchableOpacity>

      {/* Sidebar animada */}
      <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
        <Image
          source={require('../../../assets/images/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.menuText}>{name}</Text>
        <TouchableOpacity /* onPress={} */ style={{ marginTop: 20 }}>
          {/* <Text style={styles.editText}>Editar</Text> */}
          <Image
            source={require("../../../assets/images/editar.png")}
            style={{ width: 100, height: 30 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={{ position: 'absolute', bottom: 10, left: 20 }}>
          <Text style={styles.closeText}>Sair</Text>
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.enterText}>
        Olá, {name}!
      </Text>
      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.gameBtn}>
          <Image
            source={require("../../../assets/images/jogar.png")}
            style={{ width: 120, height: 40 }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.mapBtn} onPress={() => setModalMapaVisible(true)}>
          <Image
            source={require("../../../assets/images/mapa.png")}
            style={{ width: 70, height: 80 }}
          />
        </TouchableOpacity>

      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalMapaVisible}
        onRequestClose={() => setModalMapaVisible(false)}
      >
        <View style={{ flex: 1 }}>
          <Mapa onClose={() => setModalMapaVisible(false)} />
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-start",
  },
  enterText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 30,
    marginTop: '30%',
    marginBottom: 20,
    fontFamily: "Jersey10",
  },
  buttonArea: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  menuBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#8C472E',
    borderRadius: 50,
    padding: 10,
    zIndex: 2,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '70%',
    height: '100%',
    backgroundColor: '#8C472E',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  profileImage: {
    borderRadius: 40,
    width: 80,
    height: 80,
    marginLeft: '62%',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: '65%',
  },
  editText: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "Jersey10",
  },
  closeText: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "Jersey10",
  },
});
