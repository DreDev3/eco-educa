import React, { useState } from "react";
import {
    View,
    Image,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ImageBackground,
} from "react-native";
import { useFonts, Jersey10_400Regular } from "@expo-google-fonts/jersey-10";
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../../services/axios';
import Register from "../Register/Index";
import Perfil from "../Perfil/Index";

export default function Login() {
    const [cadastrarImg, setCadastrarImg] = useState(require('../../../assets/images/cadastrar.png'));
    const [loginImg, setLoginImg] = useState(require('../../../assets/images/login.png'));
    const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
    const [modalProfileVisible, setModalProfileVisible] = useState(false);

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [fontsLoaded] = useFonts({
        Jersey10: Jersey10_400Regular
    });

    const handleLogin = async () => {
        if (!email || !senha) {
            Toast.show({
                type: 'error',
                text1: 'Atenção',
                text2: 'Preencha todos os campos.'
            });
            return;
        }

        try {
            const response = await axios.post('/tokens', {
                email,
                password: senha
            });

            const { token } = response.data;

            await AsyncStorage.setItem('token', token);

            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Login realizado com sucesso!'
            });

            // Abrir modal do perfil
            setModalProfileVisible(true);

        } catch (error) {
            console.error('Erro no login:', error.response?.data || error.message);
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Credenciais inválidas. Verifique e tente novamente.'
            });
        }
    };


    if (!fontsLoaded) {
        return null;
    }

    return (
        <ImageBackground
            source={require("../../../assets/images/background.png")}
            resizeMode="cover"
            style={styles.background}
        >
            <View style={styles.overlay}>
                <View style={styles.form}>
                    <ImageBackground
                        source={require('../../../assets/images/Sprite-0001.png')}
                        style={styles.inputBackground}
                        imageStyle={{ borderRadius: 30 }}
                        resizeMode="cover"
                    >
                        <TextInput
                            style={styles.textInput}
                            placeholder="E-mail"
                            placeholderTextColor="#8C472E"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </ImageBackground>

                    <ImageBackground
                        source={require('../../../assets/images/Sprite-0001.png')}
                        style={styles.inputBackground}
                        imageStyle={{ borderRadius: 30 }}
                        resizeMode="cover"
                    >
                        <TextInput
                            style={styles.textInput}
                            placeholder="Senha"
                            placeholderTextColor="#8C472E"
                            secureTextEntry
                            value={senha}
                            onChangeText={setSenha}
                        />
                    </ImageBackground>

                    <View style={styles.btnRow}>
                        <TouchableOpacity
                            style={styles.btn}
                            activeOpacity={1}
                            onPressIn={() => setCadastrarImg(require('../../../assets/images/cadastrar_hover.png'))}
                            onPressOut={() => {
                                setCadastrarImg(require('../../../assets/images/cadastrar.png'));
                                setModalRegisterVisible(true);
                            }}
                        >
                            <Image source={cadastrarImg} style={{ width: 150, height: 40 }} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btn}
                            activeOpacity={1}
                            onPressIn={() => setLoginImg(require('../../../assets/images/login_hover.png'))}
                            onPressOut={() => {
                                setLoginImg(require('../../../assets/images/login.png'));
                                handleLogin();
                            }}
                        >
                            <Image source={loginImg} style={{ width: 110, height: 40 }} />
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalRegisterVisible}
                        onRequestClose={() => setModalRegisterVisible(false)}
                    >
                        <View style={{ flex: 1, backgroundColor: '#000' }}>
                            {modalRegisterVisible && <Register onClose={() => setModalRegisterVisible(false)} />}
                        </View>
                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalProfileVisible}
                        onRequestClose={() => setModalProfileVisible(false)}
                    >
                        <View style={{ flex: 1, backgroundColor: '#000' }}>
                            {modalProfileVisible && <Perfil onClose={() => setModalProfileVisible(false)} />}
                        </View>
                    </Modal>
                </View>
            </View>
            <Toast />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    form: {
        width: "100%",
        alignItems: "center",
    },
    inputBackground: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    textInput: {
        fontFamily: "Jersey10",
        color: "#8C472E",
        fontSize: 22,
        paddingHorizontal: 10,
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginTop: 20,
    },
    btn: {
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});
