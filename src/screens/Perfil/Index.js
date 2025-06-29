import React, { useState, useEffect, useRef } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { Ionicons } from '@expo/vector-icons';
import { Alert } from "react-native";

import axios from '../../services/axios'
import Mapa from "../Mapa/Index";
import Update from "../ProfileUpdate/Index";
import GameScreen from "../Game/Index";

export default function Perfil({ onClose }) {
  const [name, setName] = useState("Usuario");
  const [mapVisible, setMapVisible] = useState(false);
  const [modalMapaVisible, setModalMapaVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const [modalGameVisible, setModalGameVisible] = useState(false);

  const baseURL = 'http://192.168.1.3/api';


  const sidebarAnim = useRef(new Animated.Value(-300)).current;

  const toggleMenu = () => {
    Animated.timing(sidebarAnim, {
      toValue: menuVisible ? -300 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          setName(decoded.nome || "Usuário");
          setAvatar(decoded.avatar || '');
        }
      } catch (error) {
        console.error("Erro ao carregar token:", error);
      }
    };

    carregarUsuario();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      onClose(); // volta para a tela inicial ou login
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  const handleSelectAvatar = async (avatarName) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      await axios.put('/users/avatar', { avatar: avatarName }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setAvatar(avatarName);
      setModalAvatarVisible(false);
    } catch (error) {
      console.error('Erro ao atualizar avatar:', error.response?.data || error.message);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      await axios.delete('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await AsyncStorage.removeItem('token');
      onClose(); // volta para a tela de login ou inicial
    } catch (error) {
      console.error('Erro ao excluir usuário:', error.response?.data || error.message);
    }
  };

  const confirmarExclusao = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir sua conta? Esta ação não poderá ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sim, excluir',
          onPress: handleDeleteProfile,
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const listaAvatares = [
    'avatar01.png',
    'avatar02.png',
    'avatar03.png',
    'avatar04.png',
    'avatar05.png',
    'avatar06.png'
  ];

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
        <TouchableOpacity onPress={() => setModalAvatarVisible(true)}>
          <Image
            source={avatar ? { uri: `${baseURL}/images/${avatar}` } : require('../../../assets/images/profile.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={{ width: 100, marginLeft: '60%' }}>
          <Text style={styles.menuText}>{name}</Text>
        </View>

        {/* Botão de editar Perfil */}
        <TouchableOpacity onPress={() => setModalUpdateVisible(true)} style={{ marginTop: 20 }}>
          <Image
            source={require("../../../assets/images/editar.png")}
            style={{ width: 100, height: 30 }}
          />
        </TouchableOpacity>

        {/* Botão de Desativar Perfil */}
        <TouchableOpacity onPress={confirmarExclusao} style={{ marginTop: 20 }}>
          <Image
            source={require("../../../assets/images/desativar.png")}
            style={{ width: 130, height: 35 }}
          />
        </TouchableOpacity>

        {/* Botão de sair da conta */}
        <TouchableOpacity onPress={handleLogout} style={{ position: 'absolute', bottom: 10, left: 20 }}>
          <Text style={styles.closeText}>Sair</Text>
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.enterText}>
        Olá, {name}!
      </Text>
      <View style={styles.buttonArea}>
        <TouchableOpacity onPress={() => setModalGameVisible(true)} style={styles.gameBtn}>
          <Image
            source={require("../../../assets/images/jogar.png")}
            style={{ width: 120, height: 40 }}
          />
        </TouchableOpacity>

        {/* Botão para o Mapa Eco-ponto */}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAvatarVisible}
        onRequestClose={() => setModalAvatarVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha seu Avatar</Text>
            <View style={styles.avatarList}>
              {listaAvatares.map((avatarName, index) => (
                <TouchableOpacity key={index} onPress={() => handleSelectAvatar(avatarName)}>
                  <Image
                    source={{ uri: `${baseURL}/images/${avatarName}` }}
                    style={styles.avatarImage}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity onPress={() => setModalAvatarVisible(false)}>
              <Text style={styles.closeModalText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalUpdateVisible}
        onRequestClose={() => setModalUpdateVisible(false)}
      >
        <Update
          onClose={() => setModalUpdateVisible(false)}
          updateName={newName => setName(newName)} />
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalGameVisible}
        onRequestClose={() => setModalGameVisible(false)}
      >
        <GameScreen
          onClose={() => setModalGameVisible(false)} />
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
    marginLeft: '64%',
  },
  menuText: {
    color: '#fff',
    fontFamily: "Jersey10",
    textAlign: 'center',
    fontSize: 22,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#8C472E',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: "Jersey10",
  },
  avatarList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 40,
  },
  closeModalText: {
    marginTop: 20,
    color: '#000000',
    fontFamily: "Jersey10",
    fontSize: 25,
  }

});
